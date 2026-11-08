"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/admin";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cool/5">
      <div className="bg-white border border-cool/10 rounded-xl p-8 max-w-sm w-full">
        <h1 className="font-headline text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-sm text-cool/60 mb-6">Sign in with an admin account.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-cool/20 rounded-lg px-3 py-2"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-cool/20 rounded-lg px-3 py-2"
            required
          />
          {error && <div className="text-sm text-energy">{error}</div>}
          <button type="submit" className="w-full bg-whizzo text-white py-2 rounded-lg">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
