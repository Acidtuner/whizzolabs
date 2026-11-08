"use client";

import { useCart } from "@/lib/cart";
import { calculateCart } from "@/lib/pricing";
import { TEN_PACK } from "@/lib/catalogue";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeItem, addItem } = useCart();

  const calc = calculateCart(
    items.map((i) => ({
      sku: i.sku,
      quantity: i.quantity,
      engravingText: i.engravingText,
      isTenPack: i.isTenPack,
    }))
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-headline text-4xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-cool/60">Your cart is empty.</p>
          <Link href="/catalogue" className="mt-4 inline-block text-whizzo font-medium">
            Browse the catalogue →
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.sku} className="flex items-center gap-4 border-b border-cool/10 pb-4">
                <div className="w-16 h-16 bg-secondary-cream rounded-lg flex items-center justify-center text-2xl">🪵</div>
                <div className="flex-1">
                  <div className="font-medium">{item.theme || item.sku}</div>
                  <div className="text-xs text-cool/60">{item.finish} · {item.sku}</div>
                  {item.engravingText && (
                    <div className="text-xs text-energy">Engraving: {item.engravingText}</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.sku, item.quantity - 1)} className="w-7 h-7 border rounded">−</button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.sku, item.quantity + 1)} className="w-7 h-7 border rounded">+</button>
                </div>
                <button onClick={() => removeItem(item.sku)} className="text-xs text-energy">Remove</button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-joy/20 rounded-xl p-5">
            <div className="flex justify-between text-sm">
              <span>Boards in cart</span>
              <span className="font-medium">{calc.boardQuantity}</span>
            </div>
            {calc.discountPercent > 0 && (
              <div className="flex justify-between text-sm mt-1 text-whizzo">
                <span>Volume discount</span>
                <span className="font-medium">{calc.discountPercent}% off</span>
              </div>
            )}
            <div className="flex justify-between mt-3 text-lg font-headline font-bold">
              <span>Subtotal</span>
              <span>₹{calc.productSubtotal}</span>
            </div>
            <div className="text-xs text-cool/60 mt-2">
              Shipping & GST calculated at checkout. Free shipping over ₹699.
            </div>
          </div>

          <button className="mt-6 w-full bg-whizzo text-white py-3 rounded-full font-medium">
            Proceed to Checkout (coming soon)
          </button>
        </>
      )}

      <div className="mt-12 border border-dashed border-cool/20 rounded-xl p-5">
        <div className="font-headline font-semibold">10-Pack Birthday Return Gift</div>
        <div className="text-sm text-cool/70 mt-1">₹2,499 · Does not count toward board discounts</div>
        <button
          onClick={() =>
            addItem({
              sku: TEN_PACK.sku,
              isTenPack: true,
              theme: TEN_PACK.name,
              quantity: 1,
            })
          }
          className="mt-3 text-sm bg-cool text-white px-4 py-2 rounded-full"
        >
          Add 10-Pack
        </button>
      </div>
    </div>
  );
}
