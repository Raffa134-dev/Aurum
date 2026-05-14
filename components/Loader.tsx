"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 600);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-obsidian flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-serif text-5xl text-ivory tracking-[0.35em] mb-16"
          >
            AURUM
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-charcoal relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gold"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xs tracking-[0.3em] text-ivory/40 uppercase"
          >
            L&apos;arte del tempo
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}