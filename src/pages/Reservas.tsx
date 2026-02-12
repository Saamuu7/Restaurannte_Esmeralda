import { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";

interface ReservationForm {
  nombre: string;
  apellidos: string;
  telefono: string;
  fecha: string;
  hora: string;
  personas: string;
}

const horasDisponibles = [
  "13:00", "13:30", "14:00", "14:30",
  "20:00", "20:30", "21:00", "21:30", "22:00",
];

const Reservas = () => {
  const [form, setForm] = useState<ReservationForm>({
    nombre: "", apellidos: "", telefono: "", fecha: "", hora: "", personas: "",
  });
  const [errors, setErrors] = useState<Partial<ReservationForm>>({});
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const validate = (): boolean => {
    const e: Partial<ReservationForm> = {};
    if (!form.nombre.trim()) e.nombre = "Nombre obligatorio";
    if (!form.apellidos.trim()) e.apellidos = "Apellidos obligatorios";
    if (!/^[0-9]{9}$/.test(form.telefono.replace(/\s/g, "")))
      e.telefono = "Teléfono inválido (9 dígitos)";
    if (!form.fecha) e.fecha = "Seleccione una fecha";
    else if (form.fecha < today) e.fecha = "No se permiten fechas pasadas";
    if (!form.hora) e.hora = "Seleccione una hora";
    if (!form.personas || parseInt(form.personas) < 1 || parseInt(form.personas) > 12)
      e.personas = "Entre 1 y 12 personas";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof ReservationForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <Layout>
        <section className="pt-32 pb-24 bg-gradient-dark min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center mx-auto mb-8">
                <Check className="text-emerald-bright" size={40} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Reserva recibida
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Tu reserva ha sido recibida correctamente.
              </p>
              <p className="text-accent font-display text-lg">
                Te esperamos en Restaurante Esmeraldas.
              </p>
              <div className="mt-8 glass-card rounded-lg p-6 text-left space-y-2 text-sm">
                <p><span className="text-muted-foreground">Nombre:</span> <span className="text-foreground">{form.nombre} {form.apellidos}</span></p>
                <p><span className="text-muted-foreground">Fecha:</span> <span className="text-foreground">{form.fecha}</span></p>
                <p><span className="text-muted-foreground">Hora:</span> <span className="text-foreground">{form.hora}</span></p>
                <p><span className="text-muted-foreground">Personas:</span> <span className="text-foreground">{form.personas}</span></p>
              </div>
              <button
                onClick={() => { setSubmitted(false); setForm({ nombre: "", apellidos: "", telefono: "", fecha: "", hora: "", personas: "" }); }}
                className="mt-8 text-accent text-sm tracking-wider uppercase hover:text-gold-light transition-colors"
              >
                Hacer otra reserva
              </button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-gradient-dark min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-accent font-cinzel text-xs tracking-[0.4em] uppercase">
              Reserve su experiencia
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-foreground mt-4">
              Reservas
            </h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Complete el formulario y nos pondremos en contacto para confirmar su reserva.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto glass-card rounded-lg p-8 md:p-12 space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FieldInput label="Nombre" value={form.nombre} error={errors.nombre} onChange={(v) => handleChange("nombre", v)} placeholder="Tu nombre" />
              <FieldInput label="Apellidos" value={form.apellidos} error={errors.apellidos} onChange={(v) => handleChange("apellidos", v)} placeholder="Tus apellidos" />
            </div>
            <FieldInput label="Teléfono" value={form.telefono} error={errors.telefono} onChange={(v) => handleChange("telefono", v)} placeholder="600 000 000" type="tel" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FieldInput label="Fecha" value={form.fecha} error={errors.fecha} onChange={(v) => handleChange("fecha", v)} type="date" min={today} />
              <div>
                <label className="block text-sm text-muted-foreground mb-2 tracking-wider uppercase">Hora</label>
                <select
                  value={form.hora}
                  onChange={(e) => handleChange("hora", e.target.value)}
                  className="w-full bg-muted border border-border text-foreground rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="">Seleccionar hora</option>
                  {horasDisponibles.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                {errors.hora && <ErrorMsg msg={errors.hora} />}
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2 tracking-wider uppercase">
                Número de personas
              </label>
              <select
                value={form.personas}
                onChange={(e) => handleChange("personas", e.target.value)}
                className="w-full bg-muted border border-border text-foreground rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
              >
                <option value="">Seleccionar</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "persona" : "personas"}</option>
                ))}
              </select>
              {errors.personas && <ErrorMsg msg={errors.personas} />}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-accent text-accent-foreground font-semibold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:glow-gold mt-4"
            >
              Enviar Reserva
            </button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

const FieldInput = ({
  label, value, error, onChange, placeholder = "", type = "text", min,
}: {
  label: string; value: string; error?: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; min?: string;
}) => (
  <div>
    <label className="block text-sm text-muted-foreground mb-2 tracking-wider uppercase">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      min={min}
      className="w-full bg-muted border border-border text-foreground rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
    />
    {error && <ErrorMsg msg={error} />}
  </div>
);

const ErrorMsg = ({ msg }: { msg: string }) => (
  <p className="flex items-center gap-1 text-destructive text-xs mt-1.5">
    <AlertCircle size={12} /> {msg}
  </p>
);

export default Reservas;
