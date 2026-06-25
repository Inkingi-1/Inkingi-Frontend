"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { RoleRouteGuard } from "@/components/RoleRouteGuard";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cart, notificationCount, setShowPostRequirementModal } = useApp();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Stores", href: "/stores" },
    { label: "Orders", href: "/orders/track" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <RoleRouteGuard allowed="buyer" />
      {/* Sticky Top App Bar */}
      <nav className="bg-surface sticky top-0 z-[60] shadow-sm flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 transition-all">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary focus:outline-none hover:bg-surface-container rounded-full p-1 transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
          <Link href="/" className="font-headline-xl text-headline-xl text-primary tracking-tight md:text-headline-md hover:opacity-90 transition-opacity">
            BuildConnect
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors px-3 py-1.5 rounded font-body-md ${
                  isActive
                    ? "text-primary font-bold bg-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link
            href="/notifications"
            aria-label="View notifications"
            className="p-2 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors rounded-full relative cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full text-[9px] font-bold flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Link>

          {/* Shopping Cart */}
          <Link href="/cart" className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartItemsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-tertiary text-on-tertiary rounded-full text-[9px] font-bold flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Post Requirement Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant hidden lg:inline">
                  {user?.fullName?.split(" ")[0]}
                </span>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="px-4 py-2 border border-outline-variant/50 rounded-lg text-xs font-bold hover:bg-surface-container transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 border border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors"
              >
                Login
              </Link>
            )}
            <button
              type="button"
              onClick={() => setShowPostRequirementModal(true)}
              className="bg-primary text-on-primary hover:bg-primary/95 px-6 py-2 rounded-lg font-label-bold transition-all active:scale-95 duration-150 cursor-pointer"
            >
              Post requirement
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] flex animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-on-background/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
            onKeyDown={(e) => e.key === "Escape" && setMobileMenuOpen(false)}
          />
          {/* Drawer content */}
          <div className="relative flex flex-col w-[280px] bg-white h-full py-8 px-6 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center mb-8">
              <span className="font-headline-md text-headline-md text-primary tracking-tight">BuildConnect</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-primary hover:bg-surface-container rounded-full p-1 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex-1 space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-primary text-on-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {link.href === "/" ? "home" : link.href === "/marketplace" ? "storefront" : link.href === "/stores" ? "store" : "local_shipping"}
                    </span>
                    <span className="text-body-md font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-6 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowPostRequirementModal(true);
                }}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-bold transition-all hover:bg-primary/90 active:scale-95 cursor-pointer"
              >
                Post requirement
              </button>
              <Link
                href="/notifications"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full mt-3 flex items-center justify-center gap-2 border border-outline-variant/30 text-primary py-3 rounded-xl font-label-bold transition-all hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">notifications</span>
                Notifications
                {notificationCount > 0 && (
                  <span className="bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1 pb-24 md:pb-0">{children}</main>

      {/* Footer */}
      <footer className="bg-surface-container-highest dark:bg-inverse-surface w-full mt-auto border-t border-outline-variant/30">
        <div className="w-full py-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="min-w-0">
            <span className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim mb-4 block">BuildConnect</span>
            <p className="text-on-surface-variant dark:text-secondary-fixed-dim max-w-[24rem] mb-6 leading-relaxed text-body-sm">
              Empowering Rwanda's construction industry through digital innovation and reliable supply chains.
            </p>
            <div className="flex gap-4">
              <button type="button" aria-label="Community" className="text-primary dark:text-primary-fixed-dim hover:text-tertiary dark:hover:text-tertiary-fixed hover:scale-110 transition-all">
                <span className="material-symbols-outlined">social_leaderboard</span>
              </button>
              <button type="button" aria-label="News" className="text-primary dark:text-primary-fixed-dim hover:text-tertiary dark:hover:text-tertiary-fixed hover:scale-110 transition-all">
                <span className="material-symbols-outlined">crossword</span>
              </button>
              <button type="button" aria-label="Website" className="text-primary dark:text-primary-fixed-dim hover:text-tertiary dark:hover:text-tertiary-fixed hover:scale-110 transition-all">
                <span className="material-symbols-outlined">link</span>
              </button>
            </div>
          </div>
          <div>
            <h5 className="font-label-bold text-primary dark:text-primary-fixed-dim mb-4">PLATFORM</h5>
            <ul className="space-y-3">
              <li>
                <Link href="/marketplace" className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors text-body-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors text-body-sm">
                  Suppliers Directory
                </Link>
              </li>
              <li>
                <button onClick={() => setShowPostRequirementModal(true)} className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors text-body-sm text-left">
                  Request Quotes
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-label-bold text-primary dark:text-primary-fixed-dim mb-4">SUPPORT</h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors text-body-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors text-body-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors text-body-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-outline-variant px-margin-mobile md:px-margin-desktop py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-on-surface-variant dark:text-secondary-fixed-dim font-body-sm">
            © 2024 BuildConnect Rwanda. Solid Ground for Modern Construction.
          </span>
          <div className="flex gap-6">
            <a href="#" className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed hover:underline text-body-sm transition-colors">Terms</a>
            <a href="#" className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed hover:underline text-body-sm transition-colors">Privacy</a>
            <a href="#" className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed hover:underline text-body-sm transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 pb-safe bg-surface/80 backdrop-blur-md z-50 rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-outline-variant/30">
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 hover:opacity-80 ${
            pathname === "/" ? "bg-tertiary-container text-on-tertiary-container rounded-full" : "text-on-secondary-container"
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === "/" ? "'FILL' 1" : "'FILL' 0" }}>home</span>
          <span className="font-label-md text-label-md">Home</span>
        </Link>
        <Link 
          href="/marketplace" 
          className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 hover:opacity-80 ${
            pathname === "/marketplace" ? "bg-tertiary-container text-on-tertiary-container rounded-full" : "text-on-secondary-container"
          }`}
        >
          <span className="material-symbols-outlined">search</span>
          <span className="font-label-md text-label-md">Search</span>
        </Link>
        <Link 
          href="/orders/track" 
          className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 hover:opacity-80 ${
            pathname.startsWith("/orders") ? "bg-tertiary-container text-on-tertiary-container rounded-full" : "text-on-secondary-container"
          }`}
        >
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="font-label-md text-label-md">Orders</span>
        </Link>
        <Link 
          href="/vendor" 
          className="flex flex-col items-center justify-center text-on-secondary-container transition-all active:scale-90 duration-200 hover:opacity-80"
        >
          <span className="material-symbols-outlined">storefront</span>
          <span className="font-label-md text-label-md">Portal</span>
        </Link>
      </nav>

      {/* FAB for Mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-[55]">
        <button
          type="button"
          onClick={() => setShowPostRequirementModal(true)}
          aria-label="Post requirement"
          className="bg-tertiary text-on-tertiary w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-95 hover:bg-tertiary/90 hover:shadow-xl transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>
      </div>
    </div>
  );
}
