"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const headline = ["Il tempo", "non si ferma.", "Tu sì."];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end pb-24">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="/video/hero-loop.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-transparent" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {headline.map((line, i) => (
            <h1
              key={i}
              className="font-serif text-[clamp(3rem,9vw,8rem)] leading-[1.05] text-ivory"
            >
              {i === 2 ? <span className="italic text-gold">{line}</span> : line}
            </h1>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          
          <a  href="/collection"
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-ivory border border-ivory/20 px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300 group"
          >
            Scopri la collezione
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <span className="text-ivory/30 text-xs tracking-widest uppercase">
            Manifattura dal 1968
          </span>
        </motion.div>
      </div>
    </section>
  );
}