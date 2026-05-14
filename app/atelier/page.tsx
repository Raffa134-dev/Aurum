"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FooterSection } from "@/components/FooterSection";

const steps = [
  {
    number: "I",
    title: "Progettazione",
    duration: "6–18 mesi",
    description:
      "Ogni calibro nasce su carta, a mano. I nostri ingegneri-artisti disegnano ogni componente in scala 1:1 prima che una macchina ne venga coinvolta. Il CAD viene dopo. La visione viene prima.",
    image: "/img/10000.webp",
  },
  {
    number: "II",
    title: "Lavorazione",
    duration: "200–400 ore per pezzo",
    description:
      "Le nostre presse a controllo numerico lavorano al micron. Ma è la mano umana che finisce ogni superficie: anglage a mano, perlage al tornio, decorazione Côtes de Genève. Nessuna macchina sa fare ciò che sa fare un occhio allenato.",
    image: "/img/bbui.jpg",
  },
  {
    number: "III",
    title: "Assemblaggio",
    duration: "Un solo mastro per orologio",
    description:
      "Un orologio AURUM è assemblato interamente da un solo mastro orologiaio. Nessuna catena di montaggio. Nessuna divisione del lavoro. Una persona, una responsabilità, un capolavoro.",
    image: "/img/rolex3.png",
  },
  {
    number: "IV",
    title: "Controllo qualità",
    duration: "15 giorni di test",
    description:
      "Prima di lasciare l'atelier, ogni orologio trascorre quindici giorni in camera di controllo: temperature estreme, variazioni di pressione, test magnetici, misura della precisione ogni ora. Solo il 94% supera al primo tentativo.",
    image: "/img/orol6.webp",
  },
];

const stats = [
  { value: "1968", label: "Anno di fondazione" },
  { value: "47", label: "Mastri orologiai" },
  { value: "380", label: "Max componenti per calibro" },
  { value: "94%", label: "Superamento QC al primo test" },
];

export default function AtelierPage() {
  return (
    <>
      <div className="min-h-screen pt-40 pb-0">
        <div className="max-w-screen-xl mx-auto px-8">

          {/* Header */}
          <div className="mb-24">
            <motion.p
              className="text-xs tracking-[0.4em] uppercase text-gold mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Busto Arsizio, Italia
            </motion.p>
            <motion.h1
              className="font-serif text-[clamp(3rem,7vw,6rem)] text-ivory leading-[1.0] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              L&apos;Atelier
            </motion.h1>
            <motion.p
              className="text-ivory/40 leading-relaxed text-lg max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              A 1000 metri di altitudine, nel silenzio di Busto Arsizio, 
              quarantasette maestri trasformano il metallo in tempo.
            </motion.p>
          </div>

          {/* Hero image */}
          <motion.div
            className="relative w-full aspect-[21/9] overflow-hidden mb-28"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <Image
              src="/img/atellier.webp"
              alt="Atelier AURUM"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-32 border border-subtle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-10 text-center ${i < stats.length - 1 ? "border-r border-subtle" : ""}`}
              >
                <p className="font-serif text-4xl text-gold mb-3">{s.value}</p>
                <p className="text-[11px] tracking-[0.25em] uppercase text-ivory/30">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Process steps */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-subtle ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                {/* Image */}
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    i % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-obsidian/20" />
                </div>

                {/* Text */}
                <div
                  className={`flex flex-col justify-center p-12 lg:p-16 ${
                    i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <span className="font-serif text-6xl text-gold/15 mb-6 leading-none">
                    {step.number}
                  </span>
                  <h2 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] text-ivory mb-3">
                    {step.title}
                  </h2>
                  <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
                    {step.duration}
                  </p>
                  <p className="text-ivory/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA visit */}
          <motion.div
            className="py-32 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6">
              Visite private su invito
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-ivory mb-8">
              Venite a vedere come nasce il tempo.
            </h2>
            
             <a href="/contact"
              className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-ivory border border-ivory/20 px-10 py-4 hover:border-gold hover:text-gold transition-all duration-600 group"
            >
              Richiedere una visita
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}