"use client";

import { useState } from "react";

const STATUSES = [
  "draft",
  "payment_initiated",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
] as const;

type Order = {
  id: string;
  orderNumber: string;
  email: string;
  status: string;
  total: number;
  createdAt: string;
  trackingNumber?: string;
};

const SAMPLE: Order[] = [
  { id: "1", orderNumber: "WZ-1001", email: "parent@example.com", status: "paid", total: 1260, createdAt: "2026-11-08" },
  { id: "2", orderNumber: "WZ-1002", email: "guest@example.com", status: "processing", total: 2499, createdAt: "2026-11-07", trackingNumber: "SR123456" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(SAMPLE);
  const [selected, setSelected] = useState<Order | null>(null);
  const [tracking, setTracking] = useState("");

  function updateStatus(id: string, status: string) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  function saveTracking() {
    if (!selected) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === selected.id ? { ...o, trackingNumber: tracking } : o))
    );
    setSelected({ ...selected, trackingNumber: tracking });
  }

  return (
    <div>
      <h1 className="font-headline text-3xl font-bold mb-6">Orders</h1>

      <div className="bg-white border border-cool/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cool/5 text-left">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total</th>
              <th className="p-3">Date</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-cool/10">
                <td className="p-3 font-medium">{o.orderNumber}</td>
                <td className="p-3">{o.email}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full bg-joy/40 text-xs">{o.status}</span>
                </td>
                <td className="p-3">₹{o.total}</td>
                <td className="p-3">{o.createdAt}</td>
                <td className="p-3">
                  <button onClick={() => { setSelected(o); setTracking(o.trackingNumber || ""); }} className="text-whizzo text-xs">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="mt-6 bg-white border border-cool/10 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-headline text-xl font-bold">{selected.orderNumber}</h2>
              <div className="text-sm text-cool/60">{selected.email}</div>
            </div>
            <button onClick={() => setSelected(null)} className="text-sm text-cool/50">Close</button>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Status</label>
            <select
              value={selected.status}
              onChange={(e) => updateStatus(selected.id, e.target.value)}
              className="mt-1 block border border-cool/20 rounded-lg px-3 py-2"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Tracking number</label>
            <div className="flex gap-2 mt-1">
              <input
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                className="flex-1 border border-cool/20 rounded-lg px-3 py-2"
                placeholder="Shiprocket / courier tracking"
              />
              <button onClick={saveTracking} className="bg-whizzo text-white px-4 rounded-lg text-sm">
                Save
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => updateStatus(selected.id, "cancelled")}
              className="text-sm border border-energy text-energy px-3 py-1.5 rounded-lg"
            >
              Cancel order
            </button>
            <button
              onClick={() => updateStatus(selected.id, "refunded")}
              className="text-sm border border-cool/30 px-3 py-1.5 rounded-lg"
            >
              Mark refunded
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
