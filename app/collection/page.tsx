"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { CollectionName, Material, MovementType } from "@/types";

type FilterState = {
  collection: CollectionName | "Tutte";
  material: Material | "Tutti";
  movement: MovementType | "Tutti";
};

const collections: (CollectionName | "Tutte")[] = [
  "Tutte", "Meridian", "Solstice", "Perpetua", "Noctua", "Equinox",
];
const materials: (Material | "Tutti")[] = ["Tutti", "steel", "gold", "titanium"];
const materialLabels: Record<string, string> = {
  Tutti: "Tutti",
  steel: "Acciaio",
  gold: "Oro",
  titanium: "Titanio",
};
const movements: (MovementType | "Tutti")[] = [
  "Tutti", "automatic", "manual", "quartz", "tourbillon",
];
const movementLabels: Record<string, string> = {
  Tutti: "Tutti",
  automatic: "Automatico",
  manual: "Manuale",
  quartz: "Quarzo",
  tourbillon: "Tourbillon",
};

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-400 border ${
        active
          ? "border-gold text-gold"
          : "border-subtle text-ivory/30 hover:text-ivory/60 hover:border-ivory/20"
      }`}
    >
      {label}
    </button>
  );
}

export default function CollectionPage() {
  const [filters, setFilters] = useState<FilterState>({
    collection: "Tutte",
    material: "Tutti",
    movement: "Tutti",
  });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const coll =
        filters.collection === "Tutte" || p.collection === filters.collection;
      const mat =
        filters.material === "Tutti" || p.material === filters.material;
      const mov =
        filters.movement === "Tutti" || p.movement === filters.movement;
      return coll && mat && mov;
    });
  }, [filters]);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">
            Manifattura AURUM
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-ivory leading-tight">
            La Collezione
          </h1>
          <p className="mt-4 text-ivory/40 max-w-lg leading-relaxed">
            Ogni orologio è una dichiarazione filosofica sul tempo.
            Ogni calibro, un argomento meccanico sulla perfezione.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-16 space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-ivory/20 mr-4">Linea</span>
            <div className="inline-flex flex-wrap gap-2 mt-2">
              {collections.map((c) => (
                <FilterPill
                  key={c}
                  label={c}
                  active={filters.collection === c}
                  onClick={() => setFilters((f) => ({ ...f, collection: c }))}
                />
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-ivory/20 mr-4">Materiale</span>
            <div className="inline-flex flex-wrap gap-2 mt-2">
              {materials.map((m) => (
                <FilterPill
                  key={m}
                  label={materialLabels[m]}
                  active={filters.material === m}
                  onClick={() => setFilters((f) => ({ ...f, material: m }))}
                />
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-ivory/20 mr-4">Movimento</span>
            <div className="inline-flex flex-wrap gap-2 mt-2">
              {movements.map((m) => (
                <FilterPill
                  key={m}
                  label={movementLabels[m]}
                  active={filters.movement === m}
                  onClick={() => setFilters((f) => ({ ...f, movement: m }))}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Count */}
        <motion.p
          className="text-ivory/20 text-xs tracking-widest mb-10"
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filtered.length} {filtered.length === 1 ? "pezzo" : "pezzi"}
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-serif text-2xl text-ivory/30">
              Nessun orologio corrisponde ai filtri selezionati.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}