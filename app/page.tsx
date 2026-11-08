import Link from "next/link";
import { CATALOGUE } from "@/lib/catalogue";

export default function Home() {
  return (
    <div>
      <section className="bg-joy text-cool">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <p className="font-headline text-sm tracking-widest uppercase mb-3">Playful Engineering</p>
          <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight">
            Wooden toys<br />for curious minds
          </h1>
          <p className="mt-6 max-w-xl text-lg">
            Traditional craftsmanship meets digital-era nostalgia. Montessori-inspired pine MDF boards for little engineers.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/catalogue"
              className="bg-whizzo text-white px-6 py-3 rounded-full font-medium hover:bg-whizzo/90"
            >
              Shop the Catalogue
            </Link>
            <Link
              href="/cart"
              className="border-2 border-cool px-6 py-3 rounded-full font-medium hover:bg-cool hover:text-white"
            >
              Build a Bundle
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-headline text-3xl font-bold mb-8">This month’s boards</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATALOGUE.slice(0, 8).map((p) => (
            <Link
              key={p.uid}
              href={`/product/${p.variants[0].sku}`}
              className="group border border-cool/10 rounded-xl p-4 hover:border-whizzo hover:shadow-sm transition"
            >
              <div className="aspect-square bg-secondary-cream rounded-lg mb-3 flex items-center justify-center text-4xl">
                🪵
              </div>
              <div className="font-headline font-semibold group-hover:text-whizzo">{p.theme}</div>
              <div className="text-xs text-cool/60 mt-1">{p.size}</div>
              <div className="text-sm mt-2">from ₹360</div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/catalogue" className="text-whizzo font-medium hover:underline">
            View all 20 designs →
          </Link>
        </div>
      </section>

      <section className="bg-whizzo text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="font-headline text-4xl font-bold text-joy">2×</div>
            <div className="mt-1">10% off</div>
          </div>
          <div>
            <div className="font-headline text-4xl font-bold text-joy">3×</div>
            <div className="mt-1">15% off</div>
          </div>
          <div>
            <div className="font-headline text-4xl font-bold text-joy">4+</div>
            <div className="mt-1">20% off</div>
          </div>
        </div>
      </section>
    </div>
  );
}
