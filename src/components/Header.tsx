import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/carta", label: "Carta" },
  { to: "/reservas", label: "Reservas" },
  { to: "/contacto", label: "Contacto" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-border/30 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border border-gold/30">
            <span className="font-cinzel text-accent text-lg font-bold">E</span>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-foreground text-lg tracking-[0.2em] leading-tight">
              ESMERALDAS
            </span>
            <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">
              Alta Cocina Mediterránea
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                location.pathname === link.to
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/reservas"
            className="ml-4 px-6 py-2.5 bg-accent text-accent-foreground text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 hover:glow-gold"
          >
            Reservar Mesa
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/30"
          >
            <nav className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm tracking-widest uppercase ${
                    location.pathname === link.to
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/reservas"
                className="px-8 py-3 bg-accent text-accent-foreground text-sm font-semibold tracking-wider uppercase rounded-sm"
              >
                Reservar Mesa
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
