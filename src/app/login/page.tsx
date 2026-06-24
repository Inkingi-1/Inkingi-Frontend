"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { ApiError } from "@/lib/api/client";

const DEMO_ACCOUNTS = [
  { label: "Customer", email: "customer@buildconnect.rw", password: "Customer@12345" },
  { label: "Vendor", email: "vendor@buildconnect.rw", password: "Vendor@12345" },
  { label: "Driver", email: "driver@buildconnect.rw", password: "Driver@12345" },
];

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { login } = useAuth();
  const { refreshCart, refreshNotifications } = useApp();
  const [email, setEmail] = useState("customer@buildconnect.rw");
  const [password, setPassword] = useState("Customer@12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      await Promise.all([refreshCart(), refreshNotifications()]);
      if (redirect) router.push(redirect);
      else if (email.includes("vendor")) router.push("/vendor");
      else if (email.includes("driver")) router.push("/delivery");
      else router.push("/");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed. Is the API running on port 3000?");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (account: (typeof DEMO_ACCOUNTS)[0]) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-10 sm:py-14 bg-surface">
      <div className="w-full max-w-[28rem] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block font-headline-lg text-headline-lg text-primary hover:opacity-90 transition-opacity"
          >
            BuildConnect
          </Link>
          <p className="text-on-surface-variant mt-2 text-body-md">Sign in to access your account</p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-outline-variant/20 p-6 sm:p-8 space-y-5 w-full"
        >
          {error && (
            <div
              role="alert"
              className="bg-error-container text-on-error-container text-sm p-3 rounded-xl border border-error/20"
            >
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold text-primary">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full min-w-0 box-border border border-outline-variant/40 rounded-xl px-4 py-3 text-body-md bg-white outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/40"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-bold text-primary">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full min-w-0 box-border border border-outline-variant/40 rounded-xl px-4 py-3 text-body-md bg-white outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-label-bold hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Demo accounts */}
        <div className="mt-6 bg-surface-container-low rounded-2xl p-5 border border-outline-variant/20 w-full">
          <p className="text-xs font-bold text-primary mb-3">
            Demo accounts (run npm run seed on API)
          </p>
          <div className="flex flex-wrap gap-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => fillDemo(acc)}
                className="px-4 py-2 text-xs font-bold border border-primary/30 text-primary rounded-lg hover:bg-primary hover:text-on-primary transition-colors"
              >
                {acc.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-on-surface-variant mt-6">
          <Link href="/" className="text-primary font-medium hover:underline">
            Continue browsing without login
          </Link>
        </p>
      </div>
    </div>
  );
}
