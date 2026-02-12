import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut, Clock, CheckCircle, Users, XCircle, Loader2,
  ChevronRight, CalendarDays, Filter,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ReservationStatus = "pendiente" | "confirmada" | "sentados" | "finalizada" | "cancelada";

interface Reservation {
  id: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  fecha: string;
  hora: string;
  personas: number;
  estado: ReservationStatus;
  created_at: string;
}

const statusConfig: Record<ReservationStatus, { label: string; color: string; icon: typeof Clock }> = {
  pendiente: { label: "Pendiente", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock },
  confirmada: { label: "Confirmada", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: CheckCircle },
  sentados: { label: "Sentados", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: Users },
  finalizada: { label: "Finalizada", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: CheckCircle },
  cancelada: { label: "Cancelada", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: XCircle },
};

const allowedTransitions: Record<ReservationStatus, ReservationStatus[]> = {
  pendiente: ["confirmada", "cancelada"],
  confirmada: ["sentados", "cancelada"],
  sentados: ["finalizada"],
  finalizada: [],
  cancelada: [],
};

const AdminReservas = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "todas">("todas");
  const [dateFilter, setDateFilter] = useState<"hoy" | "manana" | "semana" | "todas">("hoy");
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchReservations = useCallback(async () => {
    let query = supabase
      .from("reservations")
      .select("*")
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true });

    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const weekEnd = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];

    if (dateFilter === "hoy") query = query.eq("fecha", today);
    else if (dateFilter === "manana") query = query.eq("fecha", tomorrow);
    else if (dateFilter === "semana") query = query.gte("fecha", today).lte("fecha", weekEnd);

    if (filterStatus !== "todas") query = query.eq("estado", filterStatus);

    const { data, error } = await query;
    if (error) {
      toast({ title: "Error", description: "No se pudieron cargar las reservas", variant: "destructive" });
    } else {
      setReservations((data as Reservation[]) || []);
    }
    setLoading(false);
  }, [dateFilter, filterStatus, toast]);

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin-login");
      else fetchReservations();
    });
  }, [navigate, fetchReservations]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("reservations-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            toast({
              title: "🔔 Nueva reserva",
              description: `${(payload.new as Reservation).nombre} ${(payload.new as Reservation).apellidos} - ${(payload.new as Reservation).personas} personas`,
            });
          }
          fetchReservations();
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchReservations, toast]);

  const updateStatus = async (id: string, newStatus: ReservationStatus) => {
    const { error } = await supabase
      .from("reservations")
      .update({ estado: newStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "No se pudo actualizar el estado", variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const activeCount = reservations.filter(r => !["finalizada", "cancelada"].includes(r.estado)).length;

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Top Bar */}
      <div className="glass border-b border-border/30 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-gold/30">
              <span className="font-cinzel text-accent text-sm font-bold">E</span>
            </div>
            <div>
              <h1 className="font-display text-lg text-foreground">Panel de Reservas</h1>
              <p className="text-muted-foreground text-xs">{activeCount} reservas activas</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 mr-4">
            <CalendarDays size={16} className="text-accent" />
            {(["hoy", "manana", "semana", "todas"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDateFilter(d)}
                className={`px-4 py-2 text-xs tracking-wider uppercase rounded-sm transition-all ${
                  dateFilter === d
                    ? "bg-accent text-accent-foreground"
                    : "border border-border text-muted-foreground hover:border-accent"
                }`}
              >
                {d === "manana" ? "Mañana" : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-accent" />
            <button
              onClick={() => setFilterStatus("todas")}
              className={`px-4 py-2 text-xs tracking-wider uppercase rounded-sm transition-all ${
                filterStatus === "todas" ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground hover:border-accent"
              }`}
            >
              Todas
            </button>
            {(Object.keys(statusConfig) as ReservationStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 text-xs tracking-wider uppercase rounded-sm transition-all ${
                  filterStatus === s ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground hover:border-accent"
                }`}
              >
                {statusConfig[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Reservations List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="text-accent animate-spin" size={32} />
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <CalendarDays size={48} className="mx-auto mb-4 opacity-30" />
            <p>No hay reservas para este periodo</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map((r) => {
              const config = statusConfig[r.estado];
              const transitions = allowedTransitions[r.estado];
              const Icon = config.icon;

              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-lg p-5 flex flex-col md:flex-row md:items-center gap-4"
                >
                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-medium tracking-wider uppercase ${config.color} w-fit`}>
                    <Icon size={14} />
                    {config.label}
                  </div>

                  {/* Info */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm">
                    <div>
                      <p className="text-foreground font-medium">{r.nombre} {r.apellidos}</p>
                      <a href={`tel:${r.telefono}`} className="text-muted-foreground text-xs hover:text-accent transition-colors">
                        {r.telefono}
                      </a>
                    </div>
                    <div className="text-muted-foreground">
                      <p>{r.fecha}</p>
                    </div>
                    <div className="text-muted-foreground">
                      <p>{r.hora}</p>
                    </div>
                    <div className="text-muted-foreground">
                      <p>{r.personas} {r.personas === 1 ? "persona" : "personas"}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {transitions.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {transitions.map((nextStatus) => {
                        const nextConfig = statusConfig[nextStatus];
                        return (
                          <button
                            key={nextStatus}
                            onClick={() => updateStatus(r.id, nextStatus)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs tracking-wider uppercase border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-accent transition-all"
                          >
                            {nextConfig.label} <ChevronRight size={12} />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservas;
