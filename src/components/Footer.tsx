import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border/30">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">
              ESMERALDAS
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Alta cocina mediterránea en el corazón de Aranjuez. 
              Una experiencia gastronómica única desde 2014.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-accent shrink-0" />
                <span>Aranjuez, Madrid</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                <a href="tel:+34918000000" className="hover:text-foreground transition-colors">
                  +34 918 000 000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent shrink-0" />
                <a href="mailto:info@esmeraldas.es" className="hover:text-foreground transition-colors">
                  info@esmeraldas.es
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-accent shrink-0" />
                <span>Mar-Dom: 13:00 - 23:00</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Navegación</h4>
            <div className="space-y-3 text-sm">
              {[
                { to: "/", label: "Inicio" },
                { to: "/carta", label: "Carta" },
                { to: "/reservas", label: "Reservas" },
                { to: "/contacto", label: "Contacto" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-xs tracking-wider">
            © {new Date().getFullYear()} Restaurante Esmeraldas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
