import { getStockRows } from "@/lib/admin-queries";
import AdminShell from "@/components/AdminShell";
import StockClient from "./StockClient";

export default async function StockPage() {
  const rows = await getStockRows();
  return (
    <AdminShell>
      <StockClient initialRows={rows} />
    </AdminShell>
  );
}
