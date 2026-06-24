"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { VendorQuoteProvider, useVendorQuote } from "@/context/VendorQuoteContext";

function VendorLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { notificationCount } = useApp();
  const { itemCount: quoteCount } = useVendorQuote();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const vendorLinks = [
    { label: "Dashboard", href: "/vendor", icon: "dashboard" },
    { label: "Storefront", href: "/vendor/store", icon: "storefront" },
    { label: "Inventory", href: "/vendor/inventory", icon: "inventory_2" },
    { label: "Manage stock", href: "/vendor/inventory/manage", icon: "edit_document" },
    { label: "Sales Analytics", href: "/vendor/analytics", icon: "analytics" },
    { label: "Notifications", href: "/vendor/notifications", icon: "notifications" },
    { label: "Performance", href: "/vendor/performance", icon: "monitoring" },
    { label: "Store Settings", href: "/vendor/settings", icon: "settings" },
  ];

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[280px] bg-secondary hidden lg:flex flex-col py-8 shadow-lg z-[60]">
        <div className="px-6 mb-10">
          <Link href="/vendor" className="font-headline-md text-headline-md text-surface-container-lowest tracking-tight">
            BuildConnect
          </Link>
          <div className="mt-1 text-[10px] text-surface-container-low font-bold uppercase tracking-wider">
            Vendor Panel
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {vendorLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-6 py-3 transition-all ${
                  isActive
                    ? "text-tertiary-fixed font-bold border-l-4 border-tertiary-fixed-dim bg-white/10"
                    : "text-surface-variant/70 hover:bg-white/5 hover:text-white active:bg-white/20"
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span className="text-body-md">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile section at the bottom of sidebar */}
        <div className="px-6 mt-auto pt-6 border-t border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container">
            <img
              alt="Jean Bosco"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQjOujlqlj8KMNLcjTdkXSm8dpQRZIwZCOUPVMWLOToxgxinFvnKf35Ts3YzdNT-Lbm9WuWRh9-ABr9IvgVPiBd1XNGrJ30dlBd04bk6kqklSXbuUiPBzxFkfviTTs1y8pZF4fqVlUmi2mF8meDTVrprxjwHY3VI7mXvYKLDh8JQQjVO2yJ3Hig9niDd7ha8IHhdwbCgkfL9ftDPqpiG5Ff1AkVDSUcYHm1epfRDHgvkdwNJmjKnlPQ1Z4dN1EwbLZiRKORaeNpDE"
            />
          </div>
          <div>
            <p className="text-surface-container-lowest font-bold text-body-sm leading-none">Jean Bosco</p>
            <p className="text-surface-variant/60 text-xs mt-1">Vendor Admin</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-[280px] min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md shadow-sm flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 transition-colors">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-primary active:scale-95 duration-150"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight hidden sm:block">
              BuildConnect
            </h2>
            <h2 className="font-headline-md text-headline-md text-primary tracking-tight sm:hidden">
              BuildConnect
            </h2>
          </div>

          {/* Search bar inside admin */}
          <div className="flex-1 max-w-xl mx-4 md:mx-10 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-body-md focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-outline-variant outline-none"
              placeholder="Search vendor tools, products, transactions..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/vendor/store/cart"
              aria-label="Storefront quote cart"
              className="p-2 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors rounded-full relative cursor-pointer"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {quoteCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-tertiary text-on-tertiary rounded-full text-[9px] font-bold flex items-center justify-center">
                  {quoteCount}
                </span>
              )}
            </Link>
            <Link
              href="/vendor/notifications"
              aria-label="Vendor notifications"
              className="p-2 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors rounded-full relative cursor-pointer"
            >
              <span className="material-symbols-outlined">notifications</span>
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full text-[9px] font-bold flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Link>
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all rounded-lg font-label-bold text-xs"
            >
              <span className="material-symbols-outlined text-sm">storefront</span>
              Buyer portal
            </Link>
          </div>
        </header>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] flex animate-in fade-in duration-200">
            <div
              className="fixed inset-0 bg-on-background/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              role="button"
              tabIndex={0}
              aria-label="Close menu"
              onKeyDown={(e) => e.key === "Escape" && setMobileMenuOpen(false)}
            />
            <div className="relative flex flex-col w-[280px] bg-secondary h-full py-8 px-6 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="flex justify-between items-center mb-8">
                <span className="font-headline-md text-headline-md text-surface-container-lowest tracking-tight">
                  BuildConnect
                </span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {vendorLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "text-tertiary-fixed font-bold bg-white/10"
                          : "text-surface-variant/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="material-symbols-outlined">{link.icon}</span>
                      <span className="text-body-md font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container">
                  <img
                    alt="Jean Bosco"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQjOujlqlj8KMNLcjTdkXSm8dpQRZIwZCOUPVMWLOToxgxinFvnKf35Ts3YzdNT-Lbm9WuWRh9-ABr9IvgVPiBd1XNGrJ30dlBd04bk6kqklSXbuUiPBzxFkfviTTs1y8pZF4fqVlUmi2mF8meDTVrprxjwHY3VI7mXvYKLDh8JQQjVO2yJ3Hig9niDd7ha8IHhdwbCgkfL9ftDPqpiG5Ff1AkVDSUcYHm1epfRDHgvkdwNJmjKnlPQ1Z4dN1EwbLZiRKORaeNpDE"
                  />
                </div>
                <div>
                  <p className="text-surface-container-lowest font-bold text-body-sm leading-none">Jean Bosco</p>
                  <p className="text-surface-variant/60 text-xs mt-1">Vendor Admin</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content canvas */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop pb-20 lg:pb-margin-desktop">
          {children}
        </main>
      </div>

      {/* Mobile Vendor Quick Actions Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 pb-safe bg-secondary z-50 rounded-t-xl shadow-lg border-t border-white/10">
        <Link
          href="/vendor"
          className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 ${
            pathname === "/vendor" ? "text-tertiary-fixed font-bold bg-white/10 rounded-full" : "text-surface-variant/70"
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </Link>
        <Link
          href="/vendor/inventory"
          className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 ${
            pathname.startsWith("/vendor/inventory") ? "text-tertiary-fixed font-bold bg-white/10 rounded-full" : "text-surface-variant/70"
          }`}
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-label-md text-label-md">Stock</span>
        </Link>
        <Link
          href="/vendor/analytics"
          className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 ${
            pathname === "/vendor/analytics" ? "text-tertiary-fixed font-bold bg-white/10 rounded-full" : "text-surface-variant/70"
          }`}
        >
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-label-md text-label-md">Analytics</span>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-surface-variant/70 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="font-label-md text-label-md">Shop</span>
        </Link>
      </nav>
    </div>
  );
}

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <VendorQuoteProvider>
      <VendorLayoutInner>{children}</VendorLayoutInner>
    </VendorQuoteProvider>
  );
}
