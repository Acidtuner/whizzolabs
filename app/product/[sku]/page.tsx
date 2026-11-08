"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { CATALOGUE } from "@/lib/catalogue";
import { useCart } from "@/lib/cart";
import { getUnitPrice } from "@/lib/pricing";

export default function ProductPage() {
  const params = useParams();
  const sku = params.sku as string;
  const product = CATALOGUE.find((p) => p.variants.some((v) => v.sku === sku));
  const variant = product?.variants.find((v) => v.sku === sku) || product?.variants[0];

  const [qty, setQty] = useState(1);
  const [engraving, setEngraving] = useState("");
  const addItem = useCart((s) => s.addItem);

  if (!product || !variant) {
    return <div className="p-10">Product not found</div>;
  }

  const unit = getUnitPrice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <div className="aspect-square bg-secondary-cream rounded-2xl flex items-center justify-center text-8xl">
        🪵
      </div>
      <div>
        <div className="text-sm text-whizzo font-medium">Cat {product.category}</div>
        <h1 className="font-headline text-4xl font-bold mt-1">{product.theme}</h1>
        {product.style && <div className="text-cool/60">{product.style}</div>}
        <div className="mt-2 text-cool/70">{product.size} · 4mm Pine MDF</div>

        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Finish</div>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <a
                key={v.sku}
                href={`/product/${v.sku}`}
                className={`px-3 py-1.5 rounded-full text-sm border ${
                  v.sku === variant.sku
                    ? "bg-whizzo text-white border-whizzo"
                    : "border-cool/20 hover:border-whizzo"
                }`}
              >
                {v.finish}
                {v.extra ? ` + ${v.extra}` : ""}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 text-3xl font-headline font-bold">
          ₹{unit}
          <span className="text-base font-normal text-cool/50 line-through ml-2">₹650</span>
        </div>
        <p className="text-sm text-cool/60 mt-1">Volume discounts apply in cart (up to 20% off)</p>

        <div className="mt-6">
          <label className="text-sm font-medium">Child name engraving (+₹75)</label>
          <input
            value={engraving}
            onChange={(e) => setEngraving(e.target.value.slice(0, 15))}
            placeholder="Optional · max 15 chars"
            className="mt-1 w-full border border-cool/20 rounded-lg px-3 py-2"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 border rounded">−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="w-8 h-8 border rounded">+</button>
        </div>

        <button
          onClick={() =>
            addItem({
              sku: variant.sku,
              quantity: qty,
              engravingText: engraving || undefined,
              theme: product.theme,
              finish: variant.finish,
            })
          }
          className="mt-6 w-full bg-energy text-white py-3 rounded-full font-medium hover:bg-energy/90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
