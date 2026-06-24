"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

function notificationIcon(type: string): string {
  if (type.includes("order")) return "receipt_long";
  if (type.includes("delivery")) return "local_shipping";
  if (type.includes("requirement")) return "engineering";
  if (type.includes("payment")) return "payments";
  return "notifications";
}

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, markNotificationRead, markAllNotificationsRead, notificationCount, refreshNotifications } =
    useApp();

  useEffect(() => {
    void refreshNotifications();
    const interval = setInterval(() => void refreshNotifications(), 20_000);
    return () => clearInterval(interval);
  }, [refreshNotifications]);

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  const handleOpen = (id: string, href?: string) => {
    markNotificationRead(id);
    if (href) router.push(href);
  };

  const NotificationCard = ({
    notification,
    isUnread,
  }: {
    notification: (typeof notifications)[0];
    isUnread: boolean;
  }) => (
    <button
      type="button"
      onClick={() => handleOpen(notification.id, notification.href)}
      className={`w-full text-left rounded-2xl p-5 border transition-all flex gap-4 ${
        isUnread
          ? "bg-white border-tertiary/20 shadow-sm hover:shadow-md hover:border-tertiary/40"
          : "bg-surface-container-low border-outline-variant/15 hover:bg-white hover:shadow-sm opacity-90 hover:opacity-100"
      }`}
    >
      {notification.image ? (
        <img
          src={notification.image}
          alt=""
          className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-outline-variant/20"
        />
      ) : (
        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary-container text-primary">
          <span className="material-symbols-outlined">{notificationIcon(notification.type)}</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-bold text-body-md leading-snug ${isUnread ? "text-primary" : "text-on-surface"}`}>
            {notification.title}
          </h3>
          {isUnread && <span className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0 mt-2" aria-hidden />}
        </div>
        <p className="text-on-surface-variant text-body-sm mt-1 leading-relaxed">{notification.message}</p>
        <span className="text-outline text-xs mt-2 block">{notification.time}</span>
      </div>
    </button>
  );

  return (
    <div className="animate-in fade-in duration-300">
      <main className="py-10 px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold">Notifications</h1>
            <p className="text-on-surface-variant font-body-sm mt-1">
              {notificationCount > 0
                ? `You have ${notificationCount} unread notification${notificationCount === 1 ? "" : "s"}`
                : "You're all caught up"}
            </p>
          </div>
          {unread.length > 0 && (
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="px-5 py-2.5 border border-primary text-primary rounded-xl font-label-bold text-xs hover:bg-primary hover:text-on-primary transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/20">
            <span className="material-symbols-outlined text-6xl text-outline/30 mb-4">notifications_off</span>
            <h2 className="font-headline-md text-primary mb-2">No notifications yet</h2>
            <p className="text-on-surface-variant text-body-sm max-w-[24rem] mx-auto leading-relaxed">
              Order updates, delivery alerts, and supplier offers will appear here.
            </p>
            <Link
              href="/marketplace"
              className="inline-block mt-6 px-6 py-3 bg-primary text-on-primary rounded-xl font-label-bold text-xs hover:bg-primary/90 transition-colors"
            >
              Browse marketplace
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {unread.length > 0 && (
              <section>
                <h2 className="font-label-bold text-primary uppercase tracking-wider text-xs mb-3">New</h2>
                <ul className="space-y-3">
                  {unread.map((notification) => (
                    <li key={notification.id}>
                      <NotificationCard notification={notification} isUnread />
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {read.length > 0 && (
              <section>
                <h2 className="font-label-bold text-on-surface-variant uppercase tracking-wider text-xs mb-3">Earlier</h2>
                <ul className="space-y-3">
                  {read.map((notification) => (
                    <li key={notification.id}>
                      <NotificationCard notification={notification} isUnread={false} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
