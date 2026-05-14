"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("aurum-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      "aurum-cookie-consent",
      JSON.stringify({ necessary: true, analytics: true, marketing: true })
    );
    setVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem(
      "aurum-cookie-consent",
      JSON.stringify({ necessary: true, analytics: false, marketing: false })
    );
    setVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem("aurum-cookie-consent", JSON.stringify(preferences));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay scuro dietro il banner */}
          <motion.div
            className="fixed inset-0 z-[9980] bg-obsidian/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Banner */}
          <motion.div
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[420px] z-[9990]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <div className="bg-[#111111] border border-gold/20 shadow-[0_0_60px_rgba(0,0,0,0.8)]">

              {/* Striscia oro in cima */}
              <div className="h-px bg-gold w-full" />

              <div className="p-7">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-1">
                      Privacy
                    </p>
                    <h3 className="font-serif text-xl text-ivory">
                      Utilizziamo i cookie
                    </h3>
                  </div>
                  <button
                    onClick={rejectAll}
                    className="text-ivory/20 hover:text-ivory text-xl leading-none transition-colors duration-200 ml-4"
                    aria-label="Chiudi"
                  >
                    ×
                  </button>
                </div>

                <p className="text-ivory/50 text-sm leading-relaxed mb-6">
                  Utilizziamo cookie tecnici e, con il vostro consenso, cookie
                  analitici per migliorare l&apos;esperienza di navigazione.
                </p>

                <AnimatePresence mode="wait">
                  {showPreferences ? (
                    <motion.div
                      key="preferences"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="space-y-0 mb-5 border border-white/10">

                        {/* Necessari */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                          <div>
                            <p className="text-xs text-ivory mb-0.5">Necessari</p>
                            <p className="text-[11px] text-ivory/30">Sempre attivi</p>
                          </div>
                          <div className="w-8 h-4 bg-gold/20 rounded-full flex items-center justify-end px-0.5 flex-shrink-0 ml-4">
                            <div className="w-3 h-3 rounded-full bg-gold" />
                          </div>
                        </div>

                        {/* Analitici */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                          <div>
                            <p className="text-xs text-ivory mb-0.5">Analitici</p>
                            <p className="text-[11px] text-ivory/30">Statistiche anonime</p>
                          </div>
                          <button
                            onClick={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                            className={`w-8 h-4 rounded-full flex items-center px-0.5 flex-shrink-0 ml-4 transition-all duration-300 ${
                              preferences.analytics ? "bg-gold/20 justify-end" : "bg-white/10 justify-start"
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                              preferences.analytics ? "bg-gold" : "bg-ivory/30"
                            }`} />
                          </button>
                        </div>

                        {/* Marketing */}
                        <div className="flex items-center justify-between px-4 py-3">
                          <div>
                            <p className="text-xs text-ivory mb-0.5">Marketing</p>
                            <p className="text-[11px] text-ivory/30">Contenuti personalizzati</p>
                          </div>
                          <button
                            onClick={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                            className={`w-8 h-4 rounded-full flex items-center px-0.5 flex-shrink-0 ml-4 transition-all duration-300 ${
                              preferences.marketing ? "bg-gold/20 justify-end" : "bg-white/10 justify-start"
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                              preferences.marketing ? "bg-gold" : "bg-ivory/30"
                            }`} />
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={savePreferences}
                          className="flex-1 py-3 bg-gold text-obsidian text-xs tracking-[0.25em] uppercase font-medium hover:bg-gold-muted transition-colors duration-300"
                        >
                          Salva
                        </button>
                        <button
                          onClick={() => setShowPreferences(false)}
                          className="px-4 py-3 border border-white/10 text-ivory/40 text-xs hover:text-ivory transition-colors duration-300"
                        >
                          ←
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="main"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <button
                        onClick={acceptAll}
                        className="w-full py-3 bg-gold text-obsidian text-xs tracking-[0.3em] uppercase font-medium hover:bg-gold-muted transition-colors duration-300"
                      >
                        Accetta tutti
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={rejectAll}
                          className="flex-1 py-3 border border-white/10 text-ivory/50 text-xs tracking-[0.15em] uppercase hover:text-ivory hover:border-white/20 transition-all duration-300"
                        >
                          Solo necessari
                        </button>
                        <button
                          onClick={() => setShowPreferences(true)}
                          className="flex-1 py-3 border border-white/10 text-ivory/50 text-xs tracking-[0.15em] uppercase hover:text-ivory hover:border-white/20 transition-all duration-300"
                        >
                          Preferenze
                        </button>
                      </div>
                      <p className="text-center text-[11px] text-ivory/20 pt-1">
                        <Link href="#" className="underline underline-offset-2 hover:text-gold transition-colors duration-300">
                          Cookie Policy
                        </Link>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}