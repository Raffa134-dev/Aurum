"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const socials = [
  { label: "Discord", href: "https://discord.gg/fP3Fg8G4" },
  { label: "GitHub", href: "#" },
];

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-subtle mt-0">
      <div className="max-w-screen-xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Logo + tagline */}
          <div>
            <Link
              href="/"
              className="font-serif text-3xl tracking-[0.4em] text-ivory block mb-4"
            >
              AURUM
            </Link>
            <p className="text-ivory/30 text-sm leading-relaxed max-w-xs">
              Manifattura svizzera di orologi d&apos;eccellenza dal 1968. Il
              tempo come arte, l&apos;arte come eredità.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
              Navigazione
            </p>
            {[
              { label: "Collezione", href: "/collection" },
              { label: "Manifesto", href: "/manifesto" },
              { label: "Atelier", href: "/atelier" },
              { label: "Contatti", href: "/contact" },
            ].map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="text-ivory/40 text-sm hover:text-ivory transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
              Corrispondenza privata
            </p>
            <p className="text-ivory/30 text-sm mb-6 leading-relaxed">
              Le novità AURUM, in anteprima. Solo per chi sa aspettare.
            </p>
            {subscribed ? (
              <motion.p
                className="text-gold text-sm tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Benvenuto nel tempo.
              </motion.p>
            ) : (
              <div className="flex border border-subtle">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/20 outline-none"
                />
                <button
                  onClick={() => email && setSubscribed(true)}
                  className="px-4 py-3 text-gold text-xs tracking-widest hover:bg-gold/10 transition-colors duration-300"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/20 text-xs tracking-widest">
            © {new Date().getFullYear()} AURUM. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs tracking-[0.2em] uppercase text-ivory/30 hover:text-gold transition-colors duration-300"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
