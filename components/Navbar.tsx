"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Collezione", href: "/collection" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Atelier", href: "/atelier" },
  { label: "Contatti", href: "/contact" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 80) {
        setIsVisible(true);
      } else if (current > lastScrollY.current + 8) {
        setIsVisible(false);
        setMenuOpen(false);
      } else if (current < lastScrollY.current - 8) {
        setIsVisible(true);
      }
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-8 left-0 right-0 z-[900] px-8 py-6"
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 to-transparent pointer-events-none" />

        <div className="relative flex items-center justify-between max-w-screen-xl mx-auto">
          {/* Left — empty for balance */}
          <div className="w-32 hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.25em] uppercase text-ivory/60 hover:text-ivory transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center — Logo */}
          <Link href="/" className="font-serif text-2xl tracking-[0.4em] text-ivory">
            AURUM
          </Link>

          {/* Right */}
          <div className="w-32 hidden md:flex items-center justify-end gap-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.25em] uppercase text-ivory/60 hover:text-ivory transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <motion.span
              className="block w-6 h-px bg-ivory"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-ivory"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-ivory"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[800] bg-obsidian flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
              >
                <Link
                  href={link.href}
                  className="font-serif text-4xl text-ivory hover:text-gold transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}