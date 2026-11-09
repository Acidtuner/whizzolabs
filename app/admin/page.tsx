import Link from "next/link";
import AdminShell from "@/components/AdminShell";

export default function AdminDashboard() {
  return (
    <AdminShell>
      <h1 className="font-headline text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/admin/orders" className="bg-white border border-cool/10 rounded-xl p-5 hover:border-whizzo">
          <div className="text-sm text-cool/60">Orders</div>
          <div className="font-headline text-2xl font-bold mt-1">Manage</div>
          <div className="text-xs mt-2 text-whizzo">View, update status, add tracking</div>
        </Link>
        <Link href="/admin/catalogue" className="bg-white border border-cool/10 rounded-xl p-5 hover:border-whizzo">
          <div className="text-sm text-cool/60">Catalogue</div>
          <div className="font-headline text-2xl font-bold mt-1">Products</div>
          <div className="text-xs mt-2 text-whizzo">Series, products, variants</div>
        </Link>
        <Link href="/admin/stock" className="bg-white border border-cool/10 rounded-xl p-5 hover:border-whizzo">
          <div className="text-sm text-cool/60">Inventory</div>
          <div className="font-headline text-2xl font-bold mt-1">Stock</div>
          <div className="text-xs mt-2 text-whizzo">Adjust quantities, low stock</div>
        </Link>
      </div>
    </AdminShell>
  );
}
