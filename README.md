> Progetto personale — brand di orologi di lusso immaginario, realizzato a scopo dimostrativo.

---

## Stack

| Tecnologia | Versione |
|---|---|
| Next.js (App Router) | 15 |
| TypeScript | 5 (strict mode) |
| Tailwind CSS | 3.4 |
| Framer Motion | 11 |

---

## Struttura del progetto
aurum/
├── public/
│   └── img/                        # Immagini statiche orologi
├── src/
│   ├── app/
│   │   ├── page.tsx                # Homepage
│   │   ├── layout.tsx              # Layout globale + metadata
│   │   ├── globals.css             # Stili globali + font
│   │   ├── collection/
│   │   │   ├── page.tsx            # Griglia collezione con filtri
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # Route dinamica prodotto
│   │   │       └── ProductDetailClient.tsx
│   │   ├── manifesto/
│   │   │   └── page.tsx
│   │   ├── atelier/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx              # Fixed, headroom behavior
│   │   ├── CustomCursor.tsx        # Cursore personalizzato
│   │   ├── Loader.tsx              # Schermata di caricamento iniziale
│   │   ├── PageTransition.tsx      # Animazione cambio pagina
│   │   ├── HeroSection.tsx         # Hero fullscreen con testo animato
│   │   ├── ProductCard.tsx         # Card prodotto con hover reveal
│   │   ├── CountdownTimer.tsx      # Countdown live collezione
│   │   ├── PoetrySection.tsx       # Sezione testuale con parallax
│   │   ├── FooterSection.tsx       # Footer con newsletter
│   │   └── CookieBanner.tsx        # Banner cookie con preferenze
│   ├── data/
│   │   └── products.ts             # 6 orologi mock con dati realistici
│   └── types/
│       └── index.ts                # Tipi TypeScript (Product, Variant, ecc.)
├── .env.local
├── .gitignore
├── tailwind.config.ts
└── package.json

---

## Pagine

| Route | Descrizione |
|---|---|
| `/` | Homepage con hero, sezione poetica, featured products e countdown |
| `/collection` | Griglia completa con filtri per linea, materiale e movimento |
| `/collection/[slug]` | Pagina prodotto con galleria, configuratore e modale consultazione |
| `/manifesto` | Filosofia del brand in 5 principi con scroll animato |
| `/atelier` | Processo produttivo in 4 fasi con immagini alternate |
| `/contact` | Form di contatto con sidebar informazioni |

---

## Funzionalità principali

- **Navbar headroom** — si nasconde sullo scroll verso il basso, riappare verso l'alto
- **Configuratore prodotto** — selezione cassa e cinturino con preview e prezzo in tempo reale
- **Countdown live** — timer aggiornato ogni secondo verso la data di lancio collezione
- **Cookie banner** — consenso granulare con preferenze salvate in localStorage
- **Filtri collezione** — filtraggio per linea, materiale e movimento con conteggio risultati

