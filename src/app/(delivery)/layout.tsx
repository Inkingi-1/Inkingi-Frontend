"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { notificationCount } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Carrier Top Bar */}
      <nav className="bg-emerald-800 text-white sticky top-0 z-[60] shadow-sm flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4">
        <div className="flex items-center gap-3">
          <Link href="/delivery" className="font-headline-xl text-headline-xl text-white tracking-tight md:text-headline-md hover:opacity-90 transition-opacity">
            BuildConnect Logistics
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/delivery" 
            className={`px-3 py-1.5 rounded font-body-md transition-colors ${
              pathname === "/delivery" ? "bg-white/20 font-bold" : "hover:bg-white/10"
            }`}
          >
            Dispatch Dashboard
          </Link>
          <Link 
            href="/delivery/services" 
            className={`px-3 py-1.5 rounded font-body-md transition-colors ${
              pathname === "/delivery/services" ? "bg-white/20 font-bold" : "hover:bg-white/10"
            }`}
          >
            Logistics Offers
          </Link>
          <Link href="/" className="hover:bg-white/10 px-3 py-1.5 rounded font-body-md transition-colors">
            Buyer Portal
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-white cursor-pointer relative">
            notifications
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
            )}
          </span>
          <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
            <span className="material-symbols-outlined text-white">local_shipping</span>
          </div>
        </div>
      </nav>

      {/* Page contents */}
      <main className="flex-1 p-margin-mobile md:p-margin-desktop pb-20">
        {children}
      </main>

      {/* Mobile Carrier Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 pb-safe bg-emerald-900 text-emerald-100 z-50 rounded-t-xl shadow-lg">
        <Link
          href="/delivery"
          className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 ${
            pathname === "/delivery" ? "text-white font-bold bg-white/10 rounded-full" : "text-emerald-200"
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-md text-label-md">Dispatch</span>
        </Link>
        <Link
          href="/delivery/services"
          className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 ${
            pathname === "/delivery/services" ? "text-white font-bold bg-white/10 rounded-full" : "text-emerald-200"
          }`}
        >
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-label-md text-label-md">Offers</span>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-emerald-200 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="font-label-md text-label-md">Shop</span>
        </Link>
      </nav>
    </div>
  );
}
