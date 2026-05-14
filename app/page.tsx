import { HeroSection } from "@/components/HeroSection";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProductCard } from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";
import { motion } from "framer-motion";
import { PoetrySection } from "@/components/PoetrySection";
import { FooterSection } from "@/components/FooterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PoetrySection />

      {/* Featured collection */}
      <section className="py-28 max-w-screen-xl mx-auto px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">
              Selezione manifattura
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-ivory leading-tight">
              Pezzi scelti
            </h2>
          </div>
          
            <a href="/collection"
            className="hidden md:inline-flex text-xs tracking-[0.25em] uppercase text-ivory/40 hover:text-gold transition-colors duration-300 items-center gap-2"
          >
            Tutta la collezione
            <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <CountdownTimer />
      <FooterSection />
    </>
  );
}