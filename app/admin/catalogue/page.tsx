import { getProductsWithVariants } from "@/lib/admin-queries";
import AdminShell from "@/components/AdminShell";

export default async function CatalogueAdminPage() {
  const products = await getProductsWithVariants();

  return (
    <AdminShell>
      <h1 className="font-headline text-3xl font-bold mb-2">Catalogue</h1>
      <p className="text-sm text-cool/60 mb-6">{products.length} products</p>

      <div className="bg-white border border-cool/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cool/5 text-left">
            <tr>
              <th className="p-3">UID</th>
              <th className="p-3">Theme</th>
              <th className="p-3">Cat</th>
              <th className="p-3">Variants</th>
              <th className="p-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-cool/10">
                <td className="p-3 font-mono text-xs">{p.uid}</td>
                <td className="p-3">{p.theme}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.variants.length}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? "bg-joy/40" : "bg-cool/10"}`}>
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
