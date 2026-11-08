"use client";

import { useState } from "react";
import { CATALOGUE } from "@/lib/catalogue";

type StockRow = {
  sku: string;
  theme: string;
  finish: string;
  stock: number;
  reserved: number;
};

const INITIAL: StockRow[] = CATALOGUE.flatMap((p) =>
  p.variants.map((v) => ({
    sku: v.sku,
    theme: p.theme,
    finish: v.finish,
    stock: 50,
    reserved: 0,
  }))
);

export default function StockPage() {
  const [rows, setRows] = useState<StockRow[]>(INITIAL);
  const [filter, setFilter] = useState("");

  const visible = rows.filter(
    (r) =>
      r.sku.toLowerCase().includes(filter.toLowerCase()) ||
      r.theme.toLowerCase().includes(filter.toLowerCase())
  );

  function adjust(sku: string, delta: number) {
    setRows((prev) =>
      prev.map((r) => (r.sku === sku ? { ...r, stock: Math.max(0, r.stock + delta) } : r))
    );
  }

  const low = rows.filter((r) => r.stock - r.reserved <= 5);

  return (
    <div>
      <h1 className="font-headline text-3xl font-bold mb-2">Stock</h1>
      <p className="text-sm text-cool/60 mb-4">
        Available = stock − reserved. Low-stock threshold: 5.
      </p>

      {low.length > 0 && (
        <div className="mb-4 bg-energy/10 border border-energy/30 text-energy text-sm rounded-lg p-3">
          {low.length} SKU{low.length > 1 ? "s" : ""} at or below low-stock threshold.
        </div>
      )}

      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by SKU or theme"
        className="mb-4 w-full max-w-xs border border-cool/20 rounded-lg px-3 py-2 text-sm"
      />

      <div className="bg-white border border-cool/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cool/5 text-left">
            <tr>
              <th className="p-3">SKU</th>
              <th className="p-3">Theme</th>
              <th className="p-3">Finish</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Reserved</th>
              <th className="p-3">Available</th>
              <th className="p-3">Adjust</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => {
              const available = r.stock - r.reserved;
              return (
                <tr key={r.sku} className="border-t border-cool/10">
                  <td className="p-3 font-mono text-xs">{r.sku}</td>
                  <td className="p-3">{r.theme}</td>
                  <td className="p-3">{r.finish}</td>
                  <td className="p-3">{r.stock}</td>
                  <td className="p-3">{r.reserved}</td>
                  <td className={`p-3 font-medium ${available <= 5 ? "text-energy" : ""}`}>
                    {available}
                  </td>
                  <td className="p-3">
                    <button onClick={() => adjust(r.sku, -1)} className="px-2 border rounded mr-1">−</button>
                    <button onClick={() => adjust(r.sku, 1)} className="px-2 border rounded">+</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
