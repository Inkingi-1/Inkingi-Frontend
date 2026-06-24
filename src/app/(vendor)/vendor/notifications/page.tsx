"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PortalAuth } from "@/components/PortalAuth";
import { useApp } from "@/context/AppContext";
import { useVendorQuote } from "@/context/VendorQuoteContext";

function notificationIcon(type: string): string {
  if (type.includes("vendor") || type.includes("order")) return "receipt_long";
  if (type.includes("delivery")) return "local_shipping";
  if (type.includes("requirement")) return "engineering";
  return "notifications";
}

export default function VendorNotificationsPage() {
  const router = useRouter();
  const { notifications, markNotificationRead, markAllNotificationsRead, notificationCount, refreshNotifications } =
    useApp();
  const vendorNotifications = notifications.filter(
    (n) =>
      n.type.includes("vendor") ||
      n.type.includes("order") ||
      n.type.includes("delivery") ||
      n.type.includes("requirement") ||
      n.type.includes("payment")
  );

  useEffect(() => {
    void refreshNotifications();
    const id = setInterval(() => void refreshNotifications(), 20_000);
    return () => clearInterval(id);
  }, [refreshNotifications]);

  const unread = vendorNotifications.filter((n) => !n.read);
  const read = vendorNotifications.filter((n) => n.read);

  const handleOpen = (id: string, href?: string) => {
    markNotificationRead(id);
    if (href?.startsWith("/vendor") || href === "/notifications") {
      router.push(href.startsWith("/vendor") ? href : "/vendor/notifications");
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <PortalAuth requiredRole="vendor" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold">Vendor notifications</h1>
          <p className="text-on-surface-variant text-body-sm mt-1">
            {notificationCount > 0
              ? `${unread.length} unread vendor alert${unread.length === 1 ? "" : "s"}`
              : "Orders, deliveries, and store updates"}
          </p>
        </div>
        {unread.length > 0 && (
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="px-5 py-2.5 border border-primary text-primary rounded-xl font-label-bold text-xs hover:bg-primary hover:text-on-primary"
          >
            Mark all as read
          </button>
        )}
      </div>

      {vendorNotifications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-6xl text-outline/30 mb-4">notifications_off</span>
          <h2 className="font-headline-md text-primary mb-2">No vendor notifications yet</h2>
          <p className="text-on-surface-variant text-sm">New orders and delivery updates will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {unread.length > 0 && (
            <section>
              <h2 className="font-label-bold text-primary text-xs mb-3">New</h2>
              <ul className="space-y-3">
                {unread.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => handleOpen(n.id, n.href)}
                      className="w-full text-left bg-white rounded-2xl p-5 border border-tertiary/20 flex gap-4 hover:shadow-md"
                    >
                      {n.image ? (
                        <img src={n.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-primary-container flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">{notificationIcon(n.type)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary">{n.title}</h3>
                        <p className="text-sm text-on-surface-variant mt-1">{n.message}</p>
                        <span className="text-xs text-outline mt-2 block">{n.time}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {read.length > 0 && (
            <section>
              <h2 className="font-label-bold text-on-surface-variant text-xs mb-3">Earlier</h2>
              <ul className="space-y-3">
                {read.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => handleOpen(n.id, n.href)}
                      className="w-full text-left bg-surface-container-low rounded-2xl p-5 border flex gap-4 opacity-90 hover:opacity-100"
                    >
                      <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined">{notificationIcon(n.type)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-on-surface">{n.title}</h3>
                        <p className="text-sm text-on-surface-variant mt-1">{n.message}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      <Link href="/vendor" className="inline-block mt-8 text-primary font-bold text-sm hover:underline">
        Back to dashboard
      </Link>
    </div>
  );
}
