"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Collezione", href: "/collection" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Atelier", href: "/atelier" },
  { label: "Contatti", href: "/contact" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 40);
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
        <div className={`absolute inset-0 transition-all duration-600 ${scrolled ? "bg-obsidian/90 backdrop-blur-md" : "bg-gradient-to-b from-obsidian/70 to-transparent"}`} />

        <div className="relative flex items-center justify-between max-w-screen-xl mx-auto">

          {/* Desktop — link sinistri */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                  pathname === link.href ? "text-gold" : "text-ivory/60 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl tracking-[0.4em] text-ivory md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            AURUM
          </Link>

          {/* Desktop — link destri */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                  pathname === link.href ? "text-gold" : "text-ivory/60 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile — trigger */}
          <div className="md:hidden ml-auto relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
              className="flex items-center gap-2 px-3 py-2 bg-obsidian/80 border border-subtle"
            >
              {/* Tre linee */}
              <div className="flex flex-col gap-[4px]">
                <motion.span
                  className="block w-4 h-px bg-ivory"
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-4 h-px bg-ivory"
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-4 h-px bg-ivory"
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              {/* Label */}
              <span className="text-[9px] tracking-[0.25em] uppercase text-ivory/60">
                {menuOpen ? "Chiudi" : "Menu"}
              </span>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-48 bg-obsidian/95 border border-subtle backdrop-blur-md overflow-hidden"
                  initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                  style={{ transformOrigin: "top right" }}
                  transition={{ duration: 0.25, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.05 }}
                      className="border-b border-subtle last:border-0"
                    >
                      <Link
                        href={link.href}
                        className={`block px-5 py-3.5 text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                          pathname === link.href
                            ? "text-gold"
                            : "text-ivory/60 hover:text-ivory hover:bg-charcoal/50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.header>
    </>
  );
}