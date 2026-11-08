import { getOrders } from "@/lib/admin-queries";
import OrdersClient from "./OrdersClient";

export default async function OrdersPage() {
  const orders = await getOrders();
  return <OrdersClient initialOrders={orders} />;
}
