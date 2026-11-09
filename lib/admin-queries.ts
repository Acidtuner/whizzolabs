"use server";

import { db } from "@/db";
import { orders, products, productVariants, orderItems, addresses, orderStatusHistory } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function getOrders() {
  return db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100);
}

export async function getOrderDetail(orderId: string) {
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) return null;

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  const [address] = await db.select().from(addresses).where(eq(addresses.orderId, orderId)).limit(1);
  const history = await db
    .select()
    .from(orderStatusHistory)
    .where(eq(orderStatusHistory.orderId, orderId))
    .orderBy(desc(orderStatusHistory.createdAt));

  return { order, items, address, history };
}

export async function getProductsWithVariants() {
  const allProducts = await db.select().from(products);
  const allVariants = await db.select().from(productVariants);
  return allProducts.map((p) => ({
    ...p,
    variants: allVariants.filter((v) => v.productId === p.id),
  }));
}

export async function getStockRows() {
  return db
    .select({
      sku: productVariants.sku,
      theme: products.theme,
      finish: productVariants.finish,
      stock: productVariants.stockQuantity,
      reserved: productVariants.reservedQuantity,
      variantId: productVariants.id,
    })
    .from(productVariants)
    .innerJoin(products, eq(productVariants.productId, products.id));
}

export async function updateVariantStock(variantId: string, delta: number) {
  await db
    .update(productVariants)
    .set({
      stockQuantity: sql`${productVariants.stockQuantity} + ${delta}`,
    })
    .where(eq(productVariants.id, variantId));
}

export async function updateOrderStatus(orderId: string, status: string, trackingNumber?: string) {
  const updates: any = { status };
  if (trackingNumber !== undefined) updates.trackingNumber = trackingNumber;
  await db.update(orders).set(updates).where(eq(orders.id, orderId));
}
