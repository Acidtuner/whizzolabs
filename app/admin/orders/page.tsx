import { getOrders } from "@/lib/admin-queries";
import AdminShell from "@/components/AdminShell";
import OrdersClient from "./OrdersClient";

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <AdminShell>
      <OrdersClient initialOrders={orders} />
    </AdminShell>
  );
}
