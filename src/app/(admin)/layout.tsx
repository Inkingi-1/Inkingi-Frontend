"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminAuth } from "@/components/AdminAuth";
import { RoleRouteGuard } from "@/components/RoleRouteGuard";
import { useAuth } from "@/context/AuthContext";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "User roles", href: "/admin/users", icon: "group" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <AdminAuth />
      <RoleRouteGuard allowed="admin" />

      <header className="sticky top-0 z-50 bg-primary text-on-primary shadow-md">
        <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link href="/admin" className="font-headline-md font-bold">
              BuildConnect Admin
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                  pathname === link.href ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <span className="material-symbols-outlined text-lg">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline opacity-90 truncate max-w-[160px]">{user?.fullName}</span>
            <button
              type="button"
              onClick={() => void logout()}
              className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg font-bold text-xs"
            >
              Log out
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="md:hidden border-t border-white/20 px-4 pb-3 space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  pathname === link.href ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-8">{children}</main>
    </div>
  );
}
