import { getOrderDetail } from "@/lib/admin-queries";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getOrderDetail(id);
  if (!data) {
    return (
      <AdminShell>
        <div>Order not found</div>
      </AdminShell>
    );
  }

  const { order, items, address, history } = data;

  return (
    <AdminShell>
      <Link href="/admin/orders" className="text-sm text-whizzo">← Back to orders</Link>
      <h1 className="font-headline text-3xl font-bold mt-2">{order.orderNumber}</h1>
      <div className="text-sm text-cool/60 mt-1">{order.email} · {order.status}</div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white border border-cool/10 rounded-xl p-5">
          <h2 className="font-headline font-bold mb-3">Items</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-2 border-b border-cool/10 last:border-0">
              <div>
                <div className="font-mono text-xs">{item.sku}</div>
                <div>Qty {item.quantity} × ₹{item.unitPrice}</div>
                {item.engravingText && (
                  <div className="text-whizzo text-xs">Engraved: {item.engravingText}</div>
                )}
              </div>
              <div>₹{item.lineTotal}</div>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-cool/10 text-sm space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>₹{order.shipping}</span></div>
            <div className="flex justify-between"><span>GST</span><span>₹{order.gst}</span></div>
            <div className="flex justify-between font-bold"><span>Total</span><span>₹{order.total}</span></div>
          </div>
        </div>

        <div className="space-y-6">
          {address && (
            <div className="bg-white border border-cool/10 rounded-xl p-5">
              <h2 className="font-headline font-bold mb-3">Address</h2>
              <div className="text-sm">
                <div className="font-medium">{address.fullName}</div>
                <div>{address.line1}</div>
                {address.line2 && <div>{address.line2}</div>}
                <div>{address.city}{address.state ? `, ${address.state}` : ""} {address.pincode}</div>
                {address.phone && <div className="mt-1">{address.phone}</div>}
              </div>
            </div>
          )}

          <div className="bg-white border border-cool/10 rounded-xl p-5">
            <h2 className="font-headline font-bold mb-3">Status history</h2>
            {history.length === 0 ? (
              <div className="text-sm text-cool/50">No history recorded yet.</div>
            ) : (
              history.map((h) => (
                <div key={h.id} className="text-sm py-2 border-b border-cool/10 last:border-0">
                  <div>{h.fromStatus || "—"} → <strong>{h.toStatus}</strong></div>
                  <div className="text-xs text-cool/50">{new Date(h.createdAt).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
