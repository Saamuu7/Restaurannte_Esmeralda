import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Contacto = () => {
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
              Encuéntrenos
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-foreground mt-4">
              Contacto
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div variants={fadeUp} custom={0}>
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Restaurante Esmeraldas
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le invitamos a visitarnos en el corazón de Aranjuez. Nuestro equipo
                  estará encantado de atenderle y ofrecerle una experiencia
                  gastronómica inolvidable.
                </p>
              </motion.div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Dirección", value: "Aranjuez, Madrid", href: undefined },
                  { icon: Phone, label: "Teléfono", value: "+34 918 000 000", href: "tel:+34918000000" },
                  { icon: Mail, label: "Email", value: "info@esmeraldas.es", href: "mailto:info@esmeraldas.es" },
                  { icon: Clock, label: "Horario", value: "Mar-Dom: 13:00 - 23:00 | Lunes cerrado", href: undefined },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    custom={i + 1}
                    className="flex items-start gap-4 glass-card rounded-lg p-5"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
                      <item.icon className="text-accent" size={18} />
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-medium">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground text-sm hover:text-accent transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-lg overflow-hidden border border-border/30 h-[400px] lg:h-full min-h-[400px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24465.99654099!2d-3.620000!3d40.033500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41f5e5cbcc47a3%3A0x8a1406c3a42e2f51!2sAranjuez%2C%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Restaurante Esmeraldas en Aranjuez"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/34918000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-bright rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="text-foreground" size={26} />
      </a>
    </Layout>
  );
};

export default Contacto;
