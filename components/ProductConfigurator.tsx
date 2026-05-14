"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, Material, StrapType } from "@/types";

interface Props {
  product: Product;
}

const caseLabels: Record<Material, string> = {
  steel: "Acciaio 904L",
  gold: "Oro 18k",
  titanium: "Titanio Grado 5",
};

const strapLabels: Record<StrapType, string> = {
  leather: "Pelle Alligatore",
  metal: "Maglia Milano",
  rubber: "Caucciù Vulcanizzato",
};

const caseColors: Record<Material, string> = {
  steel: "#C0C8D0",
  gold: "#C9A84C",
  titanium: "#8A9198",
};

export function ProductConfigurator({ product }: Props) {
  const [selectedCase, setSelectedCase] = useState<Material>(product.variants[0].case);
  const [selectedStrap, setSelectedStrap] = useState<StrapType>(product.variants[0].strap);

  const activeVariant = product.variants.find(
    (v) => v.case === selectedCase && v.strap === selectedStrap
  );

  const totalPrice = product.price + (activeVariant?.priceModifier ?? 0);

  const formatted = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const availableCases = [...new Set(product.variants.map((v) => v.case))];
  const availableStraps = [...new Set(product.variants.map((v) => v.strap))];

  return (
    <div className="space-y-10">
      {/* Visual preview */}
      <div className="flex items-center gap-6 p-6 border border-subtle">
        <div
          className="w-14 h-14 rounded-full border-4 transition-all duration-600 shadow-lg"
          style={{
            borderColor: caseColors[selectedCase],
            backgroundColor: caseColors[selectedCase] + "22",
            boxShadow: `0 0 24px ${caseColors[selectedCase]}44`,
          }}
        />
        <div>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedCase + selectedStrap}
              className="font-serif text-lg text-ivory"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {caseLabels[selectedCase]} · {strapLabels[selectedStrap]}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={totalPrice}
              className="text-gold text-sm mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {formatted}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Case selector */}
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-ivory/40 mb-4">
          Cassa
        </p>
        <div className="flex flex-wrap gap-3">
          {availableCases.map((mat) => (
            <button
              key={mat}
              onClick={() => setSelectedCase(mat)}
              className={`px-5 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-400 border ${
                selectedCase === mat
                  ? "border-gold text-gold"
                  : "border-subtle text-ivory/40 hover:border-ivory/30 hover:text-ivory/70"
              }`}
            >
              {caseLabels[mat]}
            </button>
          ))}
        </div>
      </div>

      {/* Strap selector */}
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-ivory/40 mb-4">
          Cinturino
        </p>
        <div className="flex flex-wrap gap-3">
          {availableStraps.map((strap) => (
            <button
              key={strap}
              onClick={() => setSelectedStrap(strap)}
              className={`px-5 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-400 border ${
                selectedStrap === strap
                  ? "border-gold text-gold"
                  : "border-subtle text-ivory/40 hover:border-ivory/30 hover:text-ivory/70"
              }`}
            >
              {strapLabels[strap]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}