import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Utensils, Wine, Star, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import heroBg from "@/assets/hero-bg.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import interiorImg from "@/assets/restaurant-interior.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-accent font-cinzel text-sm tracking-[0.4em] uppercase">
              Desde 2014
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl text-foreground leading-tight mb-6"
          >
            Alta cocina en el{" "}
            <span className="text-gradient-gold">corazón de Aranjuez</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Una experiencia gastronómica única donde la tradición mediterránea se
            encuentra con la innovación culinaria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/reservas"
              className="px-8 py-4 bg-accent text-accent-foreground font-semibold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:glow-gold"
            >
              Reservar Mesa
            </Link>
            <Link
              to="/carta"
              className="px-8 py-4 border border-foreground/20 text-foreground font-semibold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Ver Carta
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent/60 to-transparent" />
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-accent font-cinzel text-xs tracking-[0.4em] uppercase"
            >
              Nuestra esencia
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-3xl md:text-5xl text-foreground mt-4"
            >
              Una experiencia inolvidable
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Utensils,
                title: "Cocina de Autor",
                desc: "Platos que fusionan la tradición mediterránea con técnicas contemporáneas de vanguardia.",
              },
              {
                icon: Wine,
                title: "Bodega Selecta",
                desc: "Una cuidada selección de vinos nacionales e internacionales para cada maridaje perfecto.",
              },
              {
                icon: Star,
                title: "Ambiente Exclusivo",
                desc: "Un espacio íntimo y sofisticado diseñado para crear momentos únicos e irrepetibles.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-card rounded-lg p-8 text-center group hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full bg-primary/30 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/50 transition-colors">
                  <item.icon className="text-accent" size={24} />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-accent font-cinzel text-xs tracking-[0.4em] uppercase"
            >
              Platos destacados
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-3xl md:text-5xl text-foreground mt-4"
            >
              Del mar y la tierra
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: dish1,
                name: "Paccheri al Tartufo",
                desc: "Pasta fresca con trufa negra y parmesano",
                price: "28€",
              },
              {
                img: dish2,
                name: "Lubina a la Brasa",
                desc: "Con cítricos del jardín y hierbas frescas",
                price: "34€",
              },
              {
                img: dish3,
                name: "Lingote de Chocolate",
                desc: "Con hoja de oro y coulis de frutos rojos",
                price: "16€",
              },
            ].map((dish, i) => (
              <motion.div
                key={dish.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className="absolute bottom-4 right-4 text-accent font-cinzel text-lg">
                    {dish.price}
                  </span>
                </div>
                <h3 className="font-display text-xl text-foreground mb-1">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground text-sm">{dish.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mt-12"
          >
            <Link
              to="/carta"
              className="inline-flex items-center gap-2 text-accent hover:text-gold-light transition-colors text-sm tracking-wider uppercase"
            >
              Ver carta completa <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="text-accent font-cinzel text-xs tracking-[0.4em] uppercase"
              >
                Nuestra historia
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="font-display text-3xl md:text-5xl text-foreground mt-4 mb-6"
              >
                Tradición y pasión desde 2014
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground leading-relaxed mb-4"
              >
                Restaurante Esmeraldas nació de la pasión por la cocina mediterránea
                y el deseo de ofrecer una experiencia gastronómica excepcional en el
                corazón de Aranjuez.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground leading-relaxed mb-8"
              >
                Cada plato es una obra de arte que combina ingredientes de primera
                calidad con técnicas culinarias refinadas, respetando siempre la
                esencia de la cocina mediterránea.
              </motion.p>
              <motion.div variants={fadeUp} custom={4}>
                <Link
                  to="/reservas"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:glow-gold"
                >
                  Vivir la experiencia
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={interiorImg}
                alt="Interior del Restaurante Esmeraldas"
                className="rounded-lg w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg">
                <span className="font-display text-3xl block">10+</span>
                <span className="text-sm">Años de excelencia</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
        </div>
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display text-3xl md:text-5xl text-foreground mb-6"
            >
              Reserve su mesa <span className="text-gradient-gold">hoy</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground text-lg max-w-xl mx-auto mb-10"
            >
              Déjese sorprender por una experiencia culinaria que despertará
              todos sus sentidos.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                to="/reservas"
                className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:glow-gold"
              >
                Reservar Mesa <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
