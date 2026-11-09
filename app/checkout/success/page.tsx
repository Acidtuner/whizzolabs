import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; success?: string }>;
}) {
  const params = await searchParams;
  const success = params.success !== "false";
  const order = params.order || "—";

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      {success ? (
        <>
          <div className="text-5xl mb-4">✓</div>
          <h1 className="font-headline text-3xl font-bold">Order confirmed</h1>
          <p className="mt-2 text-cool/60">Order number</p>
          <div className="font-mono text-lg mt-1">{order}</div>
          <p className="mt-4 text-sm text-cool/60">
            A confirmation email would be sent here in production.
          </p>
        </>
      ) : (
        <>
          <div className="text-5xl mb-4">✗</div>
          <h1 className="font-headline text-3xl font-bold">Payment failed</h1>
          <p className="mt-2 text-cool/60">Order {order} was not charged.</p>
        </>
      )}
      <Link href="/catalogue" className="mt-8 inline-block text-whizzo font-medium">
        Continue shopping →
      </Link>
    </div>
  );
}
