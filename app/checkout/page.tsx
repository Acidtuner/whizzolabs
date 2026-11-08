"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { calculateCart } from "@/lib/pricing";
import { createDraftOrder } from "@/lib/checkout";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "prepaid" as "prepaid" | "cod",
  });

  const calc = calculateCart(
    items.map((i) => ({
      sku: i.sku,
      quantity: i.quantity,
      engravingText: i.engravingText,
      isTenPack: i.isTenPack,
    })),
    form.paymentMethod
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await createDraftOrder({
        items: items.map((i) => ({
          sku: i.sku,
          quantity: i.quantity,
          engravingText: i.engravingText,
          isTenPack: i.isTenPack,
        })),
        email: form.email,
        paymentMethod: form.paymentMethod,
        address: {
          fullName: form.fullName,
          phone: form.phone,
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
      });
      clear();
      router.push(`/checkout/pay?orderId=${result.orderId}&total=${result.total}`);
    } catch (err: any) {
      setError(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-cool/60">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-headline text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full border border-cool/20 rounded-lg px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <input
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="mt-1 w-full border border-cool/20 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1 w-full border border-cool/20 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Address</label>
          <input
            required
            value={form.line1}
            onChange={(e) => setForm({ ...form, line1: e.target.value })}
            placeholder="Line 1"
            className="mt-1 w-full border border-cool/20 rounded-lg px-3 py-2"
          />
          <input
            value={form.line2}
            onChange={(e) => setForm({ ...form, line2: e.target.value })}
            placeholder="Line 2 (optional)"
            className="mt-2 w-full border border-cool/20 rounded-lg px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="City"
            className="border border-cool/20 rounded-lg px-3 py-2"
          />
          <input
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            placeholder="State"
            className="border border-cool/20 rounded-lg px-3 py-2"
          />
          <input
            required
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            placeholder="Pincode"
            className="border border-cool/20 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Payment method</label>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.paymentMethod === "prepaid"}
                onChange={() => setForm({ ...form, paymentMethod: "prepaid" })}
              />
              Prepaid (−₹30)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.paymentMethod === "cod"}
                onChange={() => setForm({ ...form, paymentMethod: "cod" })}
                disabled={!calc.codEligible}
              />
              COD (+₹49) {!calc.codEligible && <span className="text-xs text-energy">(not eligible)</span>}
            </label>
          </div>
        </div>

        <div className="bg-joy/20 rounded-xl p-4 text-sm space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{calc.productSubtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{calc.shipping === 0 ? "Free" : `₹${calc.shipping}`}</span>
          </div>
          {calc.codFee > 0 && (
            <div className="flex justify-between">
              <span>COD fee</span>
              <span>₹{calc.codFee}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>GST (12%)</span>
            <span>₹{calc.gst}</span>
          </div>
          {calc.prepaidDiscount > 0 && (
            <div className="flex justify-between text-whizzo">
              <span>Prepaid discount</span>
              <span>−₹{calc.prepaidDiscount}</span>
            </div>
          )}
          <div className="flex justify-between font-headline font-bold text-lg pt-2 border-t border-cool/10">
            <span>Total</span>
            <span>₹{calc.finalPayable}</span>
          </div>
        </div>

        {error && <div className="text-sm text-energy">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-whizzo text-white py-3 rounded-full font-medium disabled:opacity-50"
        >
          {loading ? "Creating order…" : "Place order"}
        </button>
      </form>
    </div>
  );
}
