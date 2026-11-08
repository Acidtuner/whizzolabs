"use server";

import { db } from "@/db";
import { products, productVariants, series } from "@/db/schema";
import { eq } from "drizzle-orm";

export type CatalogueProduct = {
  id: string;
  uid: string;
  theme: string;
  category: string | null;
  style: string | null;
  size: string;
  isActive: boolean;
  variants: Array<{
    id: string;
    sku: string;
    finish: string | null;
    extraNotes: string | null;
    isTenPack: boolean;
  }>;
};

export async function getPublicCatalogue(): Promise<CatalogueProduct[]> {
  const activeSeries = await db
    .select()
    .from(series)
    .where(eq(series.isActive, true));

  if (activeSeries.length === 0) return [];

  const allProducts = await db
    .select()
    .from(products)
    .where(eq(products.isActive, true));

  const allVariants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.isActive, true));

  return allProducts
    .filter((p) => activeSeries.some((s) => s.id === p.seriesId))
    .map((p) => ({
      id: p.id,
      uid: p.uid,
      theme: p.theme,
      category: p.category,
      style: p.style,
      size: p.sizeWidth && p.sizeHeight ? `${p.sizeWidth}W \u00d7 ${p.sizeHeight}H` : "",
      isActive: p.isActive,
      variants: allVariants
        .filter((v) => v.productId === p.id)
        .map((v) => ({
          id: v.id,
          sku: v.sku,
          finish: v.finish,
          extraNotes: v.extraNotes,
          isTenPack: v.isTenPack,
        })),
    }))
    .filter((p) => p.variants.length > 0);
}

export async function getProductBySku(sku: string) {
  const catalogue = await getPublicCatalogue();
  return catalogue.find((p) => p.variants.some((v) => v.sku === sku)) || null;
}
