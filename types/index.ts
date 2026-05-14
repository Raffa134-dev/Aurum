export type Material = "steel" | "gold" | "titanium";
export type StrapType = "leather" | "metal" | "rubber";
export type MovementType = "automatic" | "manual" | "quartz" | "tourbillon";

export interface Variant {
  case: Material;
  strap: StrapType;
  priceModifier: number;
}

export interface ProductSpec {
  movement: string;
  caliber: string;
  powerReserve: string;
  waterResistance: string;
  caseDiameter: string;
  caseThickness: string;
  crystal: string;
  functions: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  collection: CollectionName;
  material: Material;
  movement: MovementType;
  isLimitedEdition: boolean;
  limitedCount?: number;
  images: string[];
  specs: ProductSpec;
  variants: Variant[];
}

export type CollectionName =
  | "Meridian"
  | "Solstice"
  | "Perpetua"
  | "Noctua"
  | "Equinox";

export interface Collection {
  name: CollectionName;
  description: string;
  year: number;
}