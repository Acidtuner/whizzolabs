"use server";

import { randomUUID } from "crypto";
import { db } from "@/db";
import { orders, orderItems, addresses, productVariants } from "@/db/schema";
import { calculateCart, CartItemInput } from "@/lib/pricing";
import { eq, sql } from "drizzle-orm";

type CheckoutInput = {
  items: CartItemInput[];
  email: string;
  paymentMethod: "prepaid" | "cod";
  address: {
    fullName: string;
    phone?: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    pincode: string;
  };
};

export async function createDraftOrder(input: CheckoutInput) {
  const calc = calculateCart(input.items, input.paymentMethod);

  if (input.paymentMethod === "cod" && !calc.codEligible) {
    throw new Error("COD not eligible for this order");
  }

  const orderId = randomUUID();
  const orderNumber = `WZ-${Date.now().toString().slice(-6)}`;

  await db.transaction(async (tx) => {
    for (const item of input.items) {
      const [variant] = await tx
        .select()
        .from(productVariants)
        .where(eq(productVariants.sku, item.sku))
        .limit(1);

      if (variant) {
        const available = variant.stockQuantity - variant.reservedQuantity;
        if (available < item.quantity) {
          throw new Error(`Insufficient stock for ${item.sku}`);
        }
        await tx
          .update(productVariants)
          .set({
            reservedQuantity: sql`${productVariants.reservedQuantity} + ${item.quantity}`,
          })
          .where(eq(productVariants.id, variant.id));
      }
    }

    await tx.insert(orders).values({
      id: orderId,
      orderNumber,
      email: input.email,
      status: "draft",
      paymentMethod: input.paymentMethod,
      subtotal: calc.productSubtotal,
      shipping: calc.shipping,
      codFee: calc.codFee,
      gst: calc.gst,
      prepaidDiscount: calc.prepaidDiscount,
      total: calc.finalPayable,
    });

    for (const line of calc.lines) {
      await tx.insert(orderItems).values({
        id: randomUUID(),
        orderId,
        sku: line.sku,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        engravingText: input.items.find((i) => i.sku === line.sku)?.engravingText || null,
        engravingFee: line.engravingFee,
        lineTotal: line.lineTotal,
      });
    }

    await tx.insert(addresses).values({
      id: randomUUID(),
      orderId,
      fullName: input.address.fullName,
      phone: input.address.phone,
      line1: input.address.line1,
      line2: input.address.line2,
      city: input.address.city,
      state: input.address.state,
      pincode: input.address.pincode,
    });
  });

  return { orderId, orderNumber, total: calc.finalPayable };
}

export async function confirmPayment(orderId: string, success: boolean) {
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) throw new Error("Order not found");

  if (success) {
    await db.transaction(async (tx) => {
      await tx.update(orders).set({ status: "paid" }).where(eq(orders.id, orderId));

      const items = await tx.select().from(orderItems).where(eq(orderItems.orderId, orderId));
      for (const item of items) {
        const [variant] = await tx
          .select()
          .from(productVariants)
          .where(eq(productVariants.sku, item.sku))
          .limit(1);
        if (variant) {
          await tx
            .update(productVariants)
            .set({
              stockQuantity: sql`${productVariants.stockQuantity} - ${item.quantity}`,
              reservedQuantity: sql`${productVariants.reservedQuantity} - ${item.quantity}`,
            })
            .where(eq(productVariants.id, variant.id));
        }
      }
    });
  } else {
    await db.transaction(async (tx) => {
      await tx.update(orders).set({ status: "payment_failed" }).where(eq(orders.id, orderId));

      const items = await tx.select().from(orderItems).where(eq(orderItems.orderId, orderId));
      for (const item of items) {
        const [variant] = await tx
          .select()
          .from(productVariants)
          .where(eq(productVariants.sku, item.sku))
          .limit(1);
        if (variant) {
          await tx
            .update(productVariants)
            .set({
              reservedQuantity: sql`${productVariants.reservedQuantity} - ${item.quantity}`,
            })
            .where(eq(productVariants.id, variant.id));
        }
      }
    });
  }

  return { success, orderNumber: order.orderNumber };
}
