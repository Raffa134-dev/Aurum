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
      const timer = setTimeout(() => setVisible(true), 2000);
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
        <motion.div
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:max-w-md z-[9990]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <div className="bg-charcoal border border-subtle p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-gold mb-1">
                  Privacy
                </p>
                <h3 className="font-serif text-xl text-ivory">
                  Utilizziamo i cookie
                </h3>
              </div>
              <div className="w-8 h-8 border border-subtle flex items-center justify-center flex-shrink-0 ml-4">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              </div>
            </div>

            <p className="text-ivory/40 text-sm leading-relaxed mb-6">
              AURUM utilizza cookie tecnici e, con il vostro consenso, cookie
              analitici e di marketing per migliorare l&apos;esperienza e
              proporvi contenuti pertinenti. La vostra privacy è trattata con
              la stessa cura dei nostri calibri.
            </p>

            <AnimatePresence mode="wait">
              {showPreferences ? (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-0 mb-6 border border-subtle">
                    {/* Necessary */}
                    <div className="flex items-center justify-between p-4 border-b border-subtle">
                      <div>
                        <p className="text-xs text-ivory tracking-wide mb-0.5">
                          Necessari
                        </p>
                        <p className="text-[11px] text-ivory/30">
                          Autenticazione, sicurezza, funzionamento del sito
                        </p>
                      </div>
                      <div className="w-8 h-4 bg-gold/30 rounded-full flex items-center justify-end px-0.5 flex-shrink-0 ml-4">
                        <div className="w-3 h-3 rounded-full bg-gold" />
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="flex items-center justify-between p-4 border-b border-subtle">
                      <div>
                        <p className="text-xs text-ivory tracking-wide mb-0.5">
                          Analitici
                        </p>
                        <p className="text-[11px] text-ivory/30">
                          Statistiche anonime di navigazione
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences((p) => ({ ...p, analytics: !p.analytics }))
                        }
                        className={`w-8 h-4 rounded-full flex items-center px-0.5 flex-shrink-0 ml-4 transition-all duration-300 ${
                          preferences.analytics
                            ? "bg-gold/30 justify-end"
                            : "bg-subtle justify-start"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            preferences.analytics ? "bg-gold" : "bg-ivory/20"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-xs text-ivory tracking-wide mb-0.5">
                          Marketing
                        </p>
                        <p className="text-[11px] text-ivory/30">
                          Contenuti personalizzati e comunicazioni
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences((p) => ({ ...p, marketing: !p.marketing }))
                        }
                        className={`w-8 h-4 rounded-full flex items-center px-0.5 flex-shrink-0 ml-4 transition-all duration-300 ${
                          preferences.marketing
                            ? "bg-gold/30 justify-end"
                            : "bg-subtle justify-start"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            preferences.marketing ? "bg-gold" : "bg-ivory/20"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={savePreferences}
                      className="flex-1 py-3 border border-gold text-gold text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-600"
                    >
                      Salva
                    </button>
                    <button
                      onClick={() => setShowPreferences(false)}
                      className="px-4 py-3 border border-subtle text-ivory/30 text-xs tracking-[0.2em] uppercase hover:text-ivory transition-colors duration-300"
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
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <button
                    onClick={acceptAll}
                    className="w-full py-3 bg-gold text-obsidian text-xs tracking-[0.3em] uppercase font-medium hover:bg-gold-muted transition-colors duration-300"
                  >
                    Accetta tutti
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={rejectAll}
                      className="flex-1 py-3 border border-subtle text-ivory/30 text-xs tracking-[0.2em] uppercase hover:text-ivory hover:border-ivory/30 transition-all duration-300"
                    >
                      Solo necessari
                    </button>
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="flex-1 py-3 border border-subtle text-ivory/30 text-xs tracking-[0.2em] uppercase hover:text-ivory hover:border-ivory/30 transition-all duration-300"
                    >
                      Preferenze
                    </button>
                  </div>
                  <p className="text-center text-[11px] text-ivory/20 pt-1">
                    Consulta la nostra{" "}
                    <Link href="#" className="underline underline-offset-2 hover:text-gold transition-colors duration-300">
                      Cookie Policy
                    </Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}