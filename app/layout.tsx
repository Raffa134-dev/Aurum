import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
// import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
// import { Loader } from "@/components/Loader";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "AURUM — L'arte del tempo",
  description:
    "Orologi di manifattura svizzera per chi intende il tempo come eredità.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-obsidian text-ivory antialiased">
        {/* Banner demo */}
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-charcoal/90 backdrop-blur-sm border-b border-subtle py-2 px-6 flex items-center justify-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-ivory/30 text-center">
            Progetto personale — brand immaginario a scopo dimostrativo
          </p>
        </div>

        {/* <Loader /> */}
        {/* <CustomCursor /> */}
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <CookieBanner />
      </body>
    </html>
  );
}