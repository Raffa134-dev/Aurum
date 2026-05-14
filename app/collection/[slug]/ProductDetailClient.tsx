"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product, Material, StrapType } from "@/types";
import { FooterSection } from "@/components/FooterSection";

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

const specs = (product: Product) => ({
  Movimento: product.specs.movement,
  Calibro: product.specs.caliber,
  "Riserva di carica": product.specs.powerReserve,
  Impermeabilità: product.specs.waterResistance,
  "Diametro cassa": product.specs.caseDiameter,
  "Spessore cassa": product.specs.caseThickness,
  Vetro: product.specs.crystal,
  Funzioni: product.specs.functions.join(", "),
});

export function ProductDetailClient({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  const [selectedCase, setSelectedCase] = useState<Material>(
    product.variants[0].case
  );

  const [selectedStrap, setSelectedStrap] = useState<StrapType>(
    product.variants[0].strap
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const activeVariant = product.variants.find(
    (v) => v.case === selectedCase && v.strap === selectedStrap
  );

  const totalPrice =
    product.price + (activeVariant?.priceModifier ?? 0);

  const formatted = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const availableCases = [
    ...new Set(product.variants.map((v) => v.case)),
  ];

  const availableStraps = [
    ...new Set(product.variants.map((v) => v.strap)),
  ];

  return (
    <>
      <div className="min-h-screen pt-24 pb-0">
        <div className="max-w-screen-xl mx-auto px-8 py-16">

          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-3 mb-16 text-xs tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="text-ivory/20 hover:text-ivory/50 transition-colors duration-300"
            >
              Home
            </Link>

            <span className="text-ivory/20">·</span>

            <Link
              href="/collection"
              className="text-ivory/20 hover:text-ivory/50 transition-colors duration-300"
            >
              Collezione
            </Link>

            <span className="text-ivory/20">·</span>

            <span className="text-gold">
              {product.name}
            </span>
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">

            {/* Gallery */}
            <div className="flex gap-4">

              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-pressed={activeImage === i}
                    className={`relative w-16 h-16 overflow-hidden border transition-all duration-300 ${
                      activeImage === i
                        ? "border-gold"
                        : "border-subtle opacity-40 hover:opacity-70"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} preview ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="relative flex-1 aspect-square overflow-hidden bg-charcoal">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                  >
                    <Image
                      src={
                        product.images?.[activeImage] ||
                        "/fallback.jpg"
                      }
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={activeImage === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {product.isLimitedEdition && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-obsidian/90 border border-gold/30 text-gold text-[10px] tracking-[0.25em] uppercase">
                    Edizione Limitata · {product.limitedCount} pezzi
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">

              <motion.p
                className="text-xs tracking-[0.4em] uppercase text-gold mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {product.collection}
              </motion.p>

              <motion.h1
                className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-ivory leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                }}
              >
                {product.name}
              </motion.h1>

              <motion.p
                className="font-serif italic text-xl text-ivory/40 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {product.tagline}
              </motion.p>

              <motion.p
                className="text-ivory/50 leading-relaxed mb-10 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {product.description}
              </motion.p>

              <motion.div
                className="divider mb-10"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                }}
              />

              {/* Configuratore */}
              <motion.div
                className="space-y-8 mb-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >

                {/* Case */}
                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-ivory/30 mb-4">
                    Cassa
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {availableCases.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setSelectedCase(mat)}
                        aria-pressed={selectedCase === mat}
                        className={`px-5 py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${
                          selectedCase === mat
                            ? "border-gold text-gold"
                            : "border-subtle text-ivory/30 hover:border-ivory/30 hover:text-ivory/60"
                        }`}
                      >
                        {caseLabels[mat]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strap */}
                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-ivory/30 mb-4">
                    Cinturino
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {availableStraps.map((strap) => (
                      <button
                        key={strap}
                        onClick={() => setSelectedStrap(strap)}
                        aria-pressed={selectedStrap === strap}
                        className={`px-5 py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${
                          selectedStrap === strap
                            ? "border-gold text-gold"
                            : "border-subtle text-ivory/30 hover:border-ivory/30 hover:text-ivory/60"
                        }`}
                      >
                        {strapLabels[strap]}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Price */}
              <div className="mb-10">
                <p className="text-xs tracking-[0.35em] uppercase text-ivory/30 mb-3">
                  Prezzo
                </p>

                <div className="flex items-center gap-4">
                  <p className="font-serif text-4xl text-ivory">
                    {formatted}
                  </p>

                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        caseColors[selectedCase],
                    }}
                  />
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setModalOpen(true)}
                className="group relative overflow-hidden border border-gold px-8 py-5 text-xs tracking-[0.35em] uppercase text-gold transition-all duration-500 hover:bg-gold hover:text-obsidian"
              >
                Richiedi Consulenza
              </button>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 border-t border-subtle pt-20">
            {Object.entries(specs(product)).map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-subtle pb-4"
              >
                <span className="text-xs tracking-[0.2em] uppercase text-ivory/30">
                  {label}
                </span>

                <span className="text-ivory/70 text-sm">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
}

