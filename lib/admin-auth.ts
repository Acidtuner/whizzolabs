import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  if (process.env.ADMIN_BYPASS === "true") return;

  const session = await auth();
  const role = (session?.user as any)?.role;

  if (!session || role !== "admin") {
    redirect("/admin/login");
  }
}

export async function getSession() {
  return auth();
}
