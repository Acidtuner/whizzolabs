"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { confirmPayment } from "@/lib/checkout";

function PayContent() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId") || "";
  const total = params.get("total") || "0";
  const [loading, setLoading] = useState(false);

  async function pay(success: boolean) {
    setLoading(true);
    try {
      const result = await confirmPayment(orderId, success);
      router.push(`/checkout/success?order=${result.orderNumber}&success=${success}`);
    } catch (err) {
      alert("Payment processing failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <h1 className="font-headline text-3xl font-bold mb-2">Dummy Payment Gateway</h1>
      <p className="text-cool/60 mb-6">This simulates Razorpay for development.</p>

      <div className="bg-white border border-cool/10 rounded-xl p-6 mb-6">
        <div className="text-sm text-cool/60">Order</div>
        <div className="font-mono text-sm mt-1">{orderId}</div>
        <div className="text-3xl font-headline font-bold mt-4">₹{total}</div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => pay(true)}
          disabled={loading}
          className="w-full bg-whizzo text-white py-3 rounded-full font-medium disabled:opacity-50"
        >
          {loading ? "Processing…" : "Pay successfully"}
        </button>
        <button
          onClick={() => pay(false)}
          disabled={loading}
          className="w-full border border-energy text-energy py-3 rounded-full font-medium disabled:opacity-50"
        >
          Simulate failure
        </button>
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <PayContent />
    </Suspense>
  );
}
