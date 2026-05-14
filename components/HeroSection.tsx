"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const headline = ["Il tempo", "non si ferma.", "Tu sì."];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end pb-24">
      {/* Video background (mock src — replace with real asset) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="/video/hero-loop.mp4"
      />

      {/* Simulated depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-transparent" />

      {/* Animated headline */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-8 w-full">
        <div className="overflow-hidden">
          {headline.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                className="font-serif text-[clamp(3rem,9vw,8rem)] leading-[1.05] text-ivory"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: i * 0.15 + 0.3,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
              >
                {i === 2 ? (
                  <span className="italic text-gold">{line}</span>
                ) : (
                  line
                )}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-10 flex items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          
            <a href="/collection"
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-ivory border border-ivory/20 px-8 py-4 hover:border-gold hover:text-gold transition-all duration-600 group"
          >
            Scopri la collezione
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <span className="text-ivory/30 text-xs tracking-widest uppercase">
            Manifattura dal 1968
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[40px] tracking-[0.3em] uppercase rotate-90 origin-center text-ivory">
          &gt;&gt;
        </span>
        <div className="w-px h-12 bg-ivory/30 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}