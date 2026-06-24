"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const carrierLinks = [
  { label: "Dispatch Dashboard", href: "/delivery", icon: "dashboard" },
  { label: "Logistics Offers", href: "/delivery/services", icon: "local_shipping" },
];

export default function CarrierLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-primary text-on-primary shadow-md">
        <div className="max-w-[1400px] mx-auto px-margin-mobile md:px-margin-desktop py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link href="/delivery" className="font-headline-md font-bold tracking-tight shrink-0">
              BuildConnect
            </Link>
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider opacity-80 border-l border-white/30 pl-3">
              Carrier Portal
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {carrierLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    active ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/"
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/25 rounded-lg text-xs font-bold transition-colors"
          >
            <span className="material-symbols-outlined text-sm">shopping_cart</span>
            <span className="hidden sm:inline">Buyer portal</span>
          </Link>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t border-white/20 px-margin-mobile pb-3 pt-2 space-y-1">
            {carrierLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                    active ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-margin-mobile md:py-margin-desktop">
        {children}
      </main>

      <nav className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 bg-primary text-on-primary z-50 border-t border-white/10 shadow-lg">
        {carrierLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center px-4 py-1 text-[10px] font-bold ${
                active ? "opacity-100" : "opacity-70"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{link.icon}</span>
              {link.label.split(" ")[0]}
            </Link>
          );
        })}
        <Link href="/" className="flex flex-col items-center justify-center px-4 py-1 text-[10px] font-bold opacity-70">
          <span className="material-symbols-outlined text-xl">storefront</span>
          Shop
        </Link>
      </nav>
    </div>
  );
}
