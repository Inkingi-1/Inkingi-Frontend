"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .dashboard()
      .then(setStats)
      .catch(() => setStats({}))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Users", value: stats.users, icon: "group" },
    { label: "Vendors", value: stats.vendors, icon: "storefront" },
    { label: "Products", value: stats.products, icon: "inventory_2" },
    { label: "Orders", value: stats.orders, icon: "receipt_long" },
    { label: "Pending vendors", value: stats.pendingVendors, icon: "pending" },
    { label: "Revenue (RWF)", value: stats.totalRevenue, icon: "payments" },
  ];

  return (
    <div>
      <h1 className="font-headline-lg text-primary font-bold mb-2">Admin dashboard</h1>
      <p className="text-on-surface-variant text-sm mb-8">
        Manage platform users and assign roles. Only admins can access this area.
      </p>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map((c) => (
            <div
              key={c.label}
              className="bg-white rounded-xl p-6 border border-outline-variant/15 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase text-on-surface-variant">{c.label}</span>
                <span className="material-symbols-outlined text-primary">{c.icon}</span>
              </div>
              <p className="font-headline-lg font-bold text-primary mt-3">
                {typeof c.value === "number" ? c.value.toLocaleString() : "—"}
              </p>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm hover:brightness-110"
      >
        <span className="material-symbols-outlined">admin_panel_settings</span>
        Manage user roles
      </Link>
    </div>
  );
}
