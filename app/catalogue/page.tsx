import Link from "next/link";
import { CATALOGUE } from "@/lib/catalogue";

export default function CataloguePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-headline text-4xl font-bold mb-2">Catalogue</h1>
      <p className="text-cool/70 mb-8">Series WIZTICTC01 · 4mm Pine MDF · 20 designs · 43 SKUs</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {CATALOGUE.map((p) => (
          <Link
            key={p.uid}
            href={`/product/${p.variants[0].sku}`}
            className="group border border-cool/10 rounded-xl overflow-hidden hover:border-whizzo hover:shadow-md transition"
          >
            <div className="aspect-square bg-secondary-cream flex items-center justify-center text-5xl">
              🪵
            </div>
            <div className="p-4">
              <div className="text-xs text-whizzo font-medium">Cat {p.category}</div>
              <div className="font-headline font-semibold mt-1 group-hover:text-whizzo">{p.theme}</div>
              {p.style && <div className="text-xs text-cool/50">{p.style}</div>}
              <div className="text-xs text-cool/60 mt-1">{p.size}</div>
              <div className="mt-2 text-sm">
                {p.variants.length} finishes · from ₹360
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
