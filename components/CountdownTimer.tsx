"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-05-30T14:00:00");

function getTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center min-h-[110px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={display}
            className="block font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none tabular-nums text-white"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTime(getTimeLeft());

    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-white/10 py-32">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.8) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-screen-xl px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-yellow-500">
            In arrivo
          </p>

          <h2 className="font-serif text-[clamp(1.8rem,4vw,3.5rem)] text-white">
            Nuova Collezione Equinox
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
            Una sola presentazione. Su invito. Per chi sa che il tempo è la
            sola vera rarità.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <Digit value={time.days} label="Giorni" />

          <span className="mb-6 text-4xl font-serif text-yellow-500/40">
            :
          </span>

          <Digit value={time.hours} label="Ore" />

          <span className="mb-6 text-4xl font-serif text-yellow-500/40">
            :
          </span>

          <Digit value={time.minutes} label="Minuti" />

          <span className="mb-6 text-4xl font-serif text-yellow-500/40">
            :
          </span>

          <Digit value={time.seconds} label="Secondi" />
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button className="border border-white/10 px-8 py-3 text-xs uppercase tracking-[0.3em] text-white/60 transition-all duration-500 hover:border-yellow-500 hover:text-yellow-500">
            Richiedi invito privato
          </button>
        </motion.div>
      </div>
    </section>
  );
}