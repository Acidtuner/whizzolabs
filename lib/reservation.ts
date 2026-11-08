"use server";

import { db } from "@/db";
import { orders, orderItems, productVariants } from "@/db/schema";
import { eq, and, lt, sql } from "drizzle-orm";

const RESERVATION_MINUTES = 15;

export async function releaseExpiredReservations() {
  const cutoff = new Date(Date.now() - RESERVATION_MINUTES * 60 * 1000);

  const expired = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.status, "draft"),
        lt(orders.createdAt, cutoff)
      )
    );

  for (const order of expired) {
    await db.transaction(async (tx) => {
      const items = await tx.select().from(orderItems).where(eq(orderItems.orderId, order.id));

      for (const item of items) {
        const [variant] = await tx
          .select()
          .from(productVariants)
          .where(eq(productVariants.sku, item.sku))
          .limit(1);

        if (variant && variant.reservedQuantity >= item.quantity) {
          await tx
            .update(productVariants)
            .set({
              reservedQuantity: sql`${productVariants.reservedQuantity} - ${item.quantity}`,
            })
            .where(eq(productVariants.id, variant.id));
        }
      }

      await tx
        .update(orders)
        .set({ status: "abandoned" })
        .where(eq(orders.id, order.id));
    });
  }

  return { released: expired.length };
}
