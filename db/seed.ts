import { randomUUID } from "crypto";
import { db } from "./index";
import { series, products, productVariants } from "./schema";
import { CATALOGUE, TEN_PACK } from "../lib/catalogue";

async function seed() {
  console.log("Seeding series...");
  const seriesId = randomUUID();
  await db.insert(series).values({
    id: seriesId,
    code: "WIZTICTC01",
    name: "Tic Tac Series 01",
    isActive: true,
  });

  console.log("Seeding products and variants...");
  for (const p of CATALOGUE) {
    const productId = randomUUID();
    await db.insert(products).values({
      id: productId,
      uid: p.uid,
      seriesId,
      category: p.category,
      theme: p.theme,
      style: p.style || null,
      sizeWidth: p.size.split("\u00d7")[0]?.replace("W", "").trim(),
      sizeHeight: p.size.split("\u00d7")[1]?.replace("H", "").trim(),
      mrp: 650,
      sellingPrice: 450,
      isActive: true,
      isSeasonal: p.theme === "HALLOWEEN",
    });

    for (const v of p.variants) {
      await db.insert(productVariants).values({
        id: randomUUID(),
        productId,
        sku: v.sku,
        finish: v.finish,
        colourName: v.finish === "WOODEN" ? null : v.finish,
        extraNotes: v.extra || null,
        stockQuantity: 50,
        reservedQuantity: 0,
        isActive: true,
        isTenPack: false,
      });
    }
  }

  const tenPackProductId = randomUUID();
  await db.insert(products).values({
    id: tenPackProductId,
    uid: "WIZTICTC01_10PACK",
    seriesId,
    category: "PACK",
    theme: TEN_PACK.name,
    mrp: 3499,
    sellingPrice: 2499,
    isActive: true,
  });
  await db.insert(productVariants).values({
    id: randomUUID(),
    productId: tenPackProductId,
    sku: TEN_PACK.sku,
    finish: "MIXED",
    stockQuantity: 20,
    isTenPack: true,
    isActive: true,
  });

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
