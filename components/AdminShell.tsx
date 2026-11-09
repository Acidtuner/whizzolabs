import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminShell({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-cool/5">
      <div className="bg-cool text-white">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/admin" className="font-headline font-bold text-joy">
            WHIZZO Admin
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/admin" className="hover:text-joy">Dashboard</Link>
            <Link href="/admin/orders" className="hover:text-joy">Orders</Link>
            <Link href="/admin/catalogue" className="hover:text-joy">Catalogue</Link>
            <Link href="/admin/stock" className="hover:text-joy">Stock</Link>
          </nav>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
