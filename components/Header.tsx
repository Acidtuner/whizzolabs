"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { LOGO_SRC } from "@/lib/logo";

export default function Header() {
  const count = useCart((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  return (
    <header className="border-b border-cool/10 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <img
            src={LOGO_SRC}
            alt="Whizzo"
            className="block h-12 sm:h-14 w-auto max-w-[min(70vw,280px)] object-contain object-left"
          />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/catalogue" className="hover:text-whizzo">
            Catalogue
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1 hover:text-whizzo">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-energy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
