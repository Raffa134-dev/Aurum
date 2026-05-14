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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <Link href={`/collection/${product.slug}`} className="group block">
        {/* Image container */}
        <div className="relative overflow-hidden bg-charcoal aspect-square mb-5">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB"
            />
          </motion.div>

          {/* Limited badge */}
          {product.isLimitedEdition && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-obsidian/90 border border-gold/30 text-gold text-[10px] tracking-[0.25em] uppercase">
              Edizione Limitata
              {product.limitedCount && (
                <span className="ml-1 text-ivory/40">/ {product.limitedCount}</span>
              )}
            </div>
          )}

          {/* Hover reveal overlay */}
          <motion.div
            className="absolute inset-0 bg-obsidian/70 flex items-end p-6"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <motion.p
                className="text-xs tracking-[0.25em] uppercase text-gold mb-2"
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
              >
                Scopri
              </motion.p>
              <motion.p
                className="text-ivory/60 text-sm leading-relaxed"
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {product.tagline}
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-ivory/40 mb-1">
              {product.collection}
            </p>
            <h3 className="font-serif text-xl text-ivory group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-gold font-light text-sm">{formatted}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}