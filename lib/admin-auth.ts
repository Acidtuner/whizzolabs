import { redirect } from "next/navigation";

// Simple admin gate. In production replace with Auth.js session + role check.
export function requireAdmin() {
  const isAdmin = process.env.ADMIN_BYPASS === "true" || process.env.NODE_ENV === "development";
  if (!isAdmin) {
    redirect("/admin/login");
  }
}
