import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Check if user has admin role
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin");

      if (roleError || !roles || roles.length === 0) {
        await supabase.auth.signOut();
        setError("No tienes permisos de administrador.");
        return;
      }

      navigate("/admin-reservas");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 border border-gold/30">
            <span className="font-cinzel text-accent text-2xl font-bold">E</span>
          </div>
          <h1 className="font-display text-2xl text-foreground">Panel de Empleados</h1>
          <p className="text-muted-foreground text-sm mt-2">Acceso restringido</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="glass-card rounded-lg p-8 space-y-5"
        >
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-sm p-3">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-muted-foreground mb-2 tracking-wider uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted border border-border text-foreground rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              required
              maxLength={255}
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 tracking-wider uppercase">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-muted border border-border text-foreground rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-accent-foreground font-semibold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:glow-gold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Accediendo..." : "Acceder"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
