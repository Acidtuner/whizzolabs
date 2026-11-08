import { CATALOGUE, TEN_PACK } from "@/lib/catalogue";

export default function CatalogueAdminPage() {
  return (
    <div>
      <h1 className="font-headline text-3xl font-bold mb-2">Catalogue</h1>
      <p className="text-sm text-cool/60 mb-6">Series WIZTICTC01 · {CATALOGUE.length} base products</p>

      <div className="bg-white border border-cool/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cool/5 text-left">
            <tr>
              <th className="p-3">UID</th>
              <th className="p-3">Theme</th>
              <th className="p-3">Cat</th>
              <th className="p-3">Size</th>
              <th className="p-3">Variants</th>
              <th className="p-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {CATALOGUE.map((p) => (
              <tr key={p.uid} className="border-t border-cool/10">
                <td className="p-3 font-mono text-xs">{p.uid}</td>
                <td className="p-3">{p.theme}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.size}</td>
                <td className="p-3">{p.variants.length}</td>
                <td className="p-3">
                  <span className="text-xs bg-joy/40 px-2 py-0.5 rounded-full">Active</span>
                </td>
              </tr>
            ))}
            <tr className="border-t border-cool/10 bg-secondary-cream/30">
              <td className="p-3 font-mono text-xs">{TEN_PACK.sku}</td>
              <td className="p-3">{TEN_PACK.name}</td>
              <td className="p-3">PACK</td>
              <td className="p-3">—</td>
              <td className="p-3">1</td>
              <td className="p-3">
                <span className="text-xs bg-joy/40 px-2 py-0.5 rounded-full">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-cool/60">
        Full CRUD (add series, import CSV, activate/deactivate) will connect to the database once <code>DATABASE_URL</code> is set and the seed has run.
      </div>
    </div>
  );
}
