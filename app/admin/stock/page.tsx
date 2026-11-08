import { getStockRows } from "@/lib/admin-queries";
import StockClient from "./StockClient";

export default async function StockPage() {
  const rows = await getStockRows();
  return <StockClient initialRows={rows} />;
}
