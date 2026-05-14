"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FooterSection } from "@/components/FooterSection";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const subjects = [
  "Informazioni su un orologio",
  "Consultazione privata",
  "Richiesta visita atelier",
  "Servizio post-vendita",
  "Edizioni limitate e preordini",
  "Altro",
];

const contacts = [
  {
    label: "Atelier principale",
    value: "Via Francesco Sforza 69, Busto Arsizio, Italia",
  },
  {
    label: "Corrispondenza",
    value: "correspondence@aurum-manufacture.com",
  },
  {
    label: "Telefono (solo su appuntamento)",
    value: "+39 02 123 4567",
  },
  {
    label: "Orari di risposta",
    value: "Lunedì–Venerdì\n09:00–17:00 CET",
  },
];

const inputClass =
  "w-full bg-transparent border border-subtle px-5 py-4 text-sm text-ivory placeholder:text-ivory/20 outline-none focus:border-gold/40 transition-colors duration-400";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <>
      <div className="min-h-screen pt-40 pb-0">
        <div className="max-w-screen-xl mx-auto px-8">
          {/* Header */}
          <div className="mb-24 max-w-2xl">
            <motion.p
              className="text-xs tracking-[0.4em] uppercase text-gold mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Siamo in ascolto
            </motion.p>
            <motion.h1
              className="font-serif text-[clamp(3rem,7vw,6rem)] text-ivory leading-[1.0] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              Contatti
            </motion.h1>
            <motion.p
              className="text-ivory/40 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Non esiste una risposta automatica ad AURUM. Ogni messaggio è
              letto da una persona reale, con il tempo che merita.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-20 pb-32">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="thanks"
                    className="flex flex-col justify-center h-full min-h-[400px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="w-px h-16 bg-gold mb-12" />
                    <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-ivory mb-6 leading-tight">
                      Messaggio ricevuto.
                    </h2>
                    <p className="text-ivory/40 leading-relaxed max-w-md">
                      Vi risponderemo entro 24 ore lavorative. Nel frattempo, il
                      tempo scorre — come sempre.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          subject: subjects[0],
                          message: "",
                        });
                      }}
                      className="mt-10 self-start text-xs tracking-[0.3em] uppercase text-ivory/30 hover:text-gold transition-colors duration-300"
                    >
                      ← Nuovo messaggio
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nome e cognome *"
                        value={form.name}
                        onChange={update("name")}
                        className={inputClass}
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={update("email")}
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        placeholder="Telefono (opzionale)"
                        value={form.phone}
                        onChange={update("phone")}
                        className={inputClass}
                      />
                      <div className="relative">
                        <select
                          value={form.subject}
                          onChange={update("subject")}
                          className={`${inputClass} appearance-none pr-10`}
                          style={{ backgroundColor: "#0A0A0A" }}
                        >
                          {subjects.map((s) => (
                            <option
                              key={s}
                              value={s}
                              style={{ backgroundColor: "#1A1A1A" }}
                            >
                              {s}
                            </option>
                          ))}
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/30 pointer-events-none text-xs">
                          ↓
                        </span>
                      </div>
                    </div>

                    <textarea
                      placeholder="Il vostro messaggio *"
                      value={form.message}
                      onChange={update("message")}
                      rows={7}
                      className={`${inputClass} resize-none`}
                    />

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-ivory/20 text-xs">
                        * Campi obbligatori
                      </p>
                      <motion.button
                        onClick={handleSubmit}
                        disabled={!form.name || !form.email || !form.message}
                        className="px-10 py-4 border border-gold text-gold text-xs tracking-[0.35em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-600 disabled:opacity-30 disabled:pointer-events-none"
                        whileHover={{ letterSpacing: "0.45em" }}
                      >
                        Inviare
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact info sidebar */}
            <motion.div
              className="space-y-0 border-l border-subtle pl-12 lg:pl-16 self-start"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9 }}
            >
              {contacts.map((c, i) => (
                <motion.div
                  key={c.label}
                  className="pb-10 mb-10 border-b border-subtle last:border-0 last:mb-0 last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">
                    {c.label}
                  </p>
                  <p className="text-ivory/60 text-sm leading-relaxed whitespace-pre-line">
                    {c.value}
                  </p>
                </motion.div>
              ))}

              {/* Social */}
              <div className="pt-10">
                <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-5">
                  Seguici
                </p>

                <div className="space-y-3">
                  {[
                    {
                      name: "Discord",
                      href: "https://discord.gg/fP3Fg8G4",
                    },
                    {
                      name: "GitHub",
                      href: "https://github.com/Raffa134-dev",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm text-ivory/30 hover:text-gold transition-colors duration-300 group"
                    >
                      {social.name}

                      <span className="group-hover:translate-x-1 transition-transform duration-300 text-xs">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
