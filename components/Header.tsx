"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const LOGO_SRC = "data:image/png;base64,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";

export default function Header() {
  const count = useCart((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  return (
    <header className="border-b border-cool/10 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src={LOGO_SRC}
            alt="Whizzo"
            className="h-10 w-auto"
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
