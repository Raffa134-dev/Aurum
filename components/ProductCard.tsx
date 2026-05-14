"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";

interface Props {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  const formatted = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/collection/${product.slug}`} className="group block">
        <div className="relative overflow-hidden bg-charcoal aspect-square mb-5">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>

          {product.isLimitedEdition && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-obsidian/90 border border-gold/30 text-gold text-[10px] tracking-[0.25em] uppercase">
              Edizione Limitata
              {product.limitedCount && (
                <span className="ml-1 text-ivory/40">/ {product.limitedCount}</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-ivory/40 mb-1">
              {product.collection}
            </p>
            <h3 className="font-serif text-xl text-ivory group-hover:text-gold transition-colors duration-200">
              {product.name}
            </h3>
          </div>
          <p className="text-gold font-light text-sm">{formatted}</p>
        </div>
      </Link>
    </motion.article>
  );
}