import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";

type Category = "entrantes" | "carnes" | "pescados" | "postres" | "vinos";

interface MenuItem {
  name: string;
  desc: string;
  price: string;
}

const menuData: Record<Category, MenuItem[]> = {
  entrantes: [
    { name: "Carpaccio de Ternera", desc: "Con rúcula, parmesano y trufa", price: "18€" },
    { name: "Burrata Pugliese", desc: "Tomate confitado, pesto y reducción de balsámico", price: "16€" },
    { name: "Tartare de Atún Rojo", desc: "Aguacate, sésamo y jengibre", price: "22€" },
    { name: "Croquetas de Jamón Ibérico", desc: "Cremosas con bechamel artesanal", price: "14€" },
    { name: "Alcachofas Confitadas", desc: "Con foie y reducción de Pedro Ximénez", price: "19€" },
  ],
  carnes: [
    { name: "Solomillo de Buey", desc: "Madurado 45 días con salsa de trufa", price: "38€" },
    { name: "Cordero Lechal", desc: "Confitado a baja temperatura con hierbas", price: "32€" },
    { name: "Secreto Ibérico", desc: "Con parmentier de patata y demi-glace", price: "28€" },
    { name: "Presa de Cerdo Ibérico", desc: "Con puré de manzana y reducción de sidra", price: "26€" },
  ],
  pescados: [
    { name: "Lubina Salvaje", desc: "A la brasa con cítricos y hierbas frescas", price: "34€" },
    { name: "Pulpo a la Gallega", desc: "Sobre crema de patata y pimentón de la Vera", price: "24€" },
    { name: "Merluza de Pincho", desc: "Con kokotxas en salsa verde", price: "30€" },
    { name: "Gambas Rojas de Palamós", desc: "A la plancha con sal de escamas", price: "36€" },
  ],
  postres: [
    { name: "Lingote de Chocolate", desc: "Con hoja de oro y coulis de frutos rojos", price: "16€" },
    { name: "Tiramisú Clásico", desc: "Con mascarpone artesanal y café arábica", price: "12€" },
    { name: "Tarta de Queso", desc: "Estilo vasco con frutos del bosque", price: "13€" },
    { name: "Crema Catalana", desc: "Caramelizada al momento", price: "11€" },
  ],
  vinos: [
    { name: "Ribera del Duero Reserva", desc: "Tinto, 2018 — Tempranillo", price: "45€" },
    { name: "Albariño Rías Baixas", desc: "Blanco, 2022 — Fresco y mineral", price: "28€" },
    { name: "Priorat Gran Reserva", desc: "Tinto, 2016 — Garnacha y Cariñena", price: "65€" },
    { name: "Cava Brut Nature", desc: "Espumoso, Reserva — Xarel·lo y Macabeo", price: "32€" },
    { name: "Rueda Verdejo", desc: "Blanco, 2023 — Aromático y vibrante", price: "22€" },
  ],
};

const categories: { key: Category; label: string }[] = [
  { key: "entrantes", label: "Entrantes" },
  { key: "carnes", label: "Carnes" },
  { key: "pescados", label: "Pescados" },
  { key: "postres", label: "Postres" },
  { key: "vinos", label: "Vinos" },
];

const Carta = () => {
  const [active, setActive] = useState<Category>("entrantes");

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-gradient-dark min-h-screen">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-accent font-cinzel text-xs tracking-[0.4em] uppercase">
              Nuestra selección
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-foreground mt-4">
              La Carta
            </h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Cocina mediterránea de autor elaborada con los mejores productos de temporada.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-6 py-2.5 text-sm tracking-wider uppercase rounded-sm transition-all duration-300 ${
                  active === cat.key
                    ? "bg-accent text-accent-foreground"
                    : "border border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="space-y-0">
                {menuData[active].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex items-start justify-between py-6 border-b border-border/30 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-accent font-cinzel text-lg whitespace-nowrap">
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Carta;
