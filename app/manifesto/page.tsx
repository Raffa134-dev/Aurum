"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FooterSection } from "@/components/FooterSection";

const principles = [
  {
    number: "01",
    title: "Il tempo non è una risorsa.",
    body: "Il tempo è l'unica cosa che non si può comprare, accumulare o restituire. Ogni orologio AURUM nasce da questa consapevolezza: non produciamo strumenti di misurazione. Creiamo oggetti che ti ricordano di vivere.",
  },
  {
    number: "02",
    title: "La complessità è una forma di rispetto.",
    body: "Un calibro con trecento componenti non è uno sforzo ingegneristico. È una dichiarazione d'amore verso chi lo indosserà. Ogni ingranaggio esiste perché qualcuno ha deciso che la perfezione vale il tempo che richiede.",
  },
  {
    number: "03",
    title: "Il lusso autentico non si annuncia.",
    body: "Non troverete loghi in rilievo sui nostri quadranti. Non troverete campagne pubblicitarie sui cartelloni. Chi conosce, conosce. Chi non conosce, imparerà — quando sarà pronto.",
  },
  {
    number: "04",
    title: "L'eredità si costruisce a mano.",
    body: "Ogni orologio AURUM è assemblato da un solo mastro orologiaio, che vi appone la propria firma sul fondello. Non una firma corporativa. Una firma umana. Perché la responsabilità è personale, e la qualità non si delega.",
  },
  {
    number: "05",
    title: "La rarità non è una strategia.",
    body: "Produciamo pochi pezzi perché non sappiamo farne di più senza rinunciare a qualcosa. Non è scarcità artificiale. È onestà industriale. Preferiamo deludere la domanda piuttosto che tradire lo standard.",
  },
];

export default function ManifestoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <div ref={containerRef} className="min-h-screen pt-40 pb-0">
        <div className="max-w-screen-xl mx-auto px-8">

          {/* Header */}
          <div className="max-w-2xl mb-32">
            <motion.p
              className="text-xs tracking-[0.4em] uppercase text-gold mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Chi siamo
            </motion.p>
            <motion.h1
              className="font-serif text-[clamp(3rem,7vw,6rem)] text-ivory leading-[1.0] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              Un manifesto
              <br />
              <span className="italic text-ivory/50">sul tempo.</span>
            </motion.h1>
            <motion.p
              className="text-ivory/40 leading-relaxed text-lg max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Dal 1968, AURUM esiste per una sola ragione: creare oggetti che durano più di chi li ha fatti.
            </motion.p>
          </div>

          {/* Principles */}
          <div className="relative">
            {/* Vertical progress line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-subtle hidden lg:block">
              <motion.div
                className="w-full bg-gold origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="lg:pl-16 space-y-0">
              {principles.map((p, i) => (
                <motion.div
                  key={p.number}
                  className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 py-16 border-b border-subtle"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                >
                  <span className="font-serif text-5xl text-gold/20 leading-none">
                    {p.number}
                  </span>
                  <div className="max-w-2xl">
                    <h2 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] text-ivory mb-6 leading-snug">
                      {p.title}
                    </h2>
                    <p className="text-ivory/50 leading-relaxed text-base">
                      {p.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing quote */}
          <motion.div
            className="py-32 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="w-px h-16 bg-gold/30 mx-auto mb-12" />
            <blockquote className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] text-ivory italic leading-relaxed max-w-3xl mx-auto">
              &ldquo;Non costruiamo orologi per il mercato.
              <br />
              Li costruiamo per i posteri.&rdquo;
            </blockquote>
            <p className="mt-8 text-xs tracking-[0.35em] uppercase text-ivory/30">
              — Heinrich Baumer, Fondatore, 1968
            </p>
          </motion.div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}