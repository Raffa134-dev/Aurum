"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lines = [
  "Non indossi un orologio.",
  "Porti una storia.",
  "Ogni ingranaggio, un battito.",
  "Ogni ora, un'eredità.",
];

export function PoetrySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={ref}
      className="relative py-40 overflow-hidden flex items-center justify-center"
    >
      {/* Parallax background text */}
      <motion.div
        style={{ y }}
        className="opacity-10 absolute select-none pointer-events-none font-serif text-[clamp(6rem,18vw,16rem)] text-ivory/[0.025] leading-none whitespace-nowrap"
      >
        AURUM
      </motion.div>

      <div className="relative max-w-3xl mx-auto px-8 text-center space-y-6">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className={`font-serif text-[clamp(1.4rem,3.5vw,2.8rem)] text-ivory leading-tight ${
              i % 2 === 1 ? "italic text-ivory/70" : ""
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 1,
              delay: i * 0.15,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="w-16 h-px bg-gold" />
        </motion.div>
      </div>
    </section>
  );
}