"use client";

import React, { useState } from "react";
import Link from "next/link";

interface DashboardProduct {
  name: string;
  price: number;
  unit: string;
  image: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  statusColor: string;
}

const DASHBOARD_PRODUCTS: DashboardProduct[] = [
  {
    name: "Steel Rebar 12mm",
    price: 12500,
    unit: "Unit",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUR_lw39b7sixKPYZpOnkQxx4l6WsY0kLuo-iQzSP5CZvBxrIzDTH3WxpASjAA4u5XvXYtqC5nCekAVNW1S_5wxW8ANIHndG-4FMV3X4v2rq_-p8fAhTc1SRhXVzVNMn4nf5Kg3GD7-wH4u8-ytc0zyJFBlI8TjjiJlo4GMw4dve33OcOtIih3jbJlmWkiJzPabpSSBRxv_sXOQHs8UkphK-4RRVGhqNmz1Ggs-t6scSQeAA8Cj--j3BkiBF6fIOSJaZqATl59WCk",
    status: "In Stock",
    statusColor: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Industrial Safety Pack",
    price: 45000,
    unit: "Set",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClTYTGgYeHPBSq7H5m08zG0CwI5YQn0w7wRhQQSAMqu8M_CxAvP1CqeWx80umhDJUfNs56FJie8GYJmD9i64hnD2-cxGrWv7Y5QBg63oPbFaNSYfF3S9KQmVhdGPO9Gxn-u-NvbZOFYCur3c8QrNeYxOWVlCAnlIRFsdZ1yS3Imf92-vxpzQgFsooiddR0mi4YdnCk3EP3i2BlHNPHvF4IymlyVI2H6hznwyVpfMzdWAYryB58GbLxGRrahxRJa4USKBb747gXMQA",
    status: "In Stock",
    statusColor: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "OPC Cement 50kg",
    price: 9800,
    unit: "Bag",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN_Q7GHNnxBa7EXHdz5BLKGPeUFTbjxJNrtkAK8QsCyhbjmTfq1BcPnl4jD_X1ahJLnhI4TdZohBMyecFTok5lmHQ2EuMW_ypt02YMua6AhHaLEjneiM88_JVXf3mDCcpmGWIN4NhDmiVXPuPRLM4oTPOjrcsdQYZc8WNysJ29g5Dtge_YNgDmX2be-dNqTgXjw-iBjkQciJlDiMSltL8yn1940xpeE-rP-dlSlxauxQHPe71U7K2oP2alzDxBURWNIE8qVnBvFLw",
    status: "Low Stock",
    statusColor: "bg-amber-100 text-amber-800",
  },
  {
    name: "Laser Leveler Pro",
    price: 120000,
    unit: "Unit",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANzWDfM2MExboRcsgyasMR5-pJNxvbH0ZZmElxm0FH9b1ZvT7edB1o9tcdGFM-W7RcQ-1SW_iqS4l0xGtwgpgjpEuhdFNS1DjPlWmG1ueZoiAzA142e467p9zc00hEyOQj2dqaG5T3q5p1Vjc04MqEAPj2EHHlv-KtQNM0RoenvMnHQy4k_wyO8ure5ACiDuQXPGnm7K_D87KgDucdGYnkOCZ2FK0934qLphnnc16LQJSjIprXFsy8BsImPxTZzDxGqJJHI8xX4tw",
    status: "In Stock",
    statusColor: "bg-emerald-100 text-emerald-800",
  },
];

interface Review {
  author: string;
  time: string;
  rating: number;
  comment: string;
}

const RECENT_REVIEWS: Review[] = [
  {
    author: "Jean-Luc Karangwa",
    time: "2 hours ago",
    rating: 5,
    comment: "Exceptional quality on the steel reinforcements. Delivery was right on time at the site in Gasabo. Highly recommended!",
  },
  {
    author: "Marie Uwase",
    time: "Yesterday",
    rating: 4,
    comment: "Great selection of tools. One bag of cement was slightly torn during offloading, but the team replaced it immediately.",
  },
];

export default function VendorDashboardPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [notifText, setNotifText] = useState("");

  const triggerActionNotification = (text: string) => {
    setNotifText(text);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="w-full relative">
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[99] bg-primary text-on-primary px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-bold">{notifText}</span>
        </div>
      )}

      {/* Store Hero Banner */}
      <section className="relative w-full h-48 md:h-72 overflow-hidden rounded-2xl shadow-sm mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent z-10"></div>
        <img
          alt="Construction Warehouse Banner"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUIAhA8zGe8DYfT7cBUuWrHOXnHcJQWmLbgnScXG7jeO4IiLtVTDGnrMi1X9eICZ5iOyIuSsfWW2u71THDfTI61sYVZ2ixOyu79CeFbHcYzTGd9c9AGOgI02Q_8mRg-_iavNGzHodMeRCwmtvCJOC1jolx8nZrdLyzU8YpCnKglDKCw61IWHFOp2_i1TrlgCTcw2g26DmRYfdXtOj5uXGS_CsJSxrHbPWcSYNFiujK88Saw1V9d-YR_kDDP3H3dM_GG8feu9s7PmU"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col md:flex-row md:items-end gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-xl shadow-lg border-4 border-white overflow-hidden flex items-center justify-center p-2">
              <div className="text-center">
                <span className="font-headline-md text-headline-md text-primary font-extrabold block leading-tight">
                  KIH
                </span>
                <span className="text-[10px] font-label-bold uppercase tracking-widest text-secondary">
                  Logistics
                </span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-tertiary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
          </div>
          <div className="mb-2">
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-white mb-1 drop-shadow-md font-bold">
              Kigali Industrial Hub
            </h2>
            <div className="flex items-center gap-3 text-white/90">
              <span className="font-label-bold text-label-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span> Kigali, RW
              </span>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
              <span className="font-label-bold text-label-bold flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm text-yellow-400"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>{" "}
                4.8 (124 reviews)
              </span>
            </div>
          </div>
          <div className="md:ml-auto flex flex-wrap gap-3 mb-2">
            <Link
              href="/vendor/inventory/manage"
              className="px-6 py-2.5 bg-tertiary text-white font-label-bold text-label-bold rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Add Product
            </Link>
            <Link
              href="/vendor/store"
              className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-label-bold text-label-bold rounded-lg hover:bg-white/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              Storefront Preview
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-l-4 border-primary">
            <p className="font-label-bold text-label-bold text-on-secondary-container opacity-60 uppercase mb-2">
              Total Products
            </p>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-primary font-bold">1,248</h3>
              <span className="text-green-600 font-label-bold text-label-bold flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                <span className="material-symbols-outlined text-sm">trending_up</span> +12%
              </span>
            </div>
          </div>
          {/* Stat Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-l-4 border-tertiary">
            <p className="font-label-bold text-label-bold text-on-secondary-container opacity-60 uppercase mb-2">
              Active Orders
            </p>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-primary font-bold">42</h3>
              <span className="text-tertiary font-label-bold text-label-bold flex items-center gap-1 bg-tertiary-fixed/30 px-2 py-1 rounded">
                <span className="material-symbols-outlined text-sm">schedule</span> Pending
              </span>
            </div>
          </div>
          {/* Stat Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-l-4 border-green-600">
            <p className="font-label-bold text-label-bold text-on-secondary-container opacity-60 uppercase mb-2">
              Monthly Revenue
            </p>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-primary font-bold">RWF 8.4M</h3>
              <span className="text-green-600 font-label-bold text-label-bold flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                <span className="material-symbols-outlined text-sm">payments</span> Paid
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Inventory & Recent Activity */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Storefront Preview Card (Wide - 8 cols) */}
        <div className="col-span-12 md:col-span-8 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col border border-outline-variant/10">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              Live Storefront Preview
            </h3>
            <Link
              href="/vendor/store"
              className="text-tertiary font-label-bold text-label-bold hover:underline flex items-center gap-1"
            >
              View Full Storefront <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
          </div>
          <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
            {DASHBOARD_PRODUCTS.map((prod, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-square rounded-lg bg-surface-container overflow-hidden mb-3 relative">
                  <img
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={prod.image}
                  />
                  <span
                    className={`absolute top-2 left-2 font-label-bold text-[10px] px-2 py-0.5 rounded uppercase ${prod.statusColor}`}
                  >
                    {prod.status}
                  </span>
                </div>
                <h4 className="font-label-bold text-label-bold text-on-surface line-clamp-1">
                  {prod.name}
                </h4>
                <p className="font-label-md text-label-md text-on-surface-variant">
                  RWF {prod.price.toLocaleString()} / {prod.unit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews (Sidebar - 4 cols) */}
        <div className="col-span-12 md:col-span-4 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-outline-variant/10 flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Recent Reviews
              </h3>
              <div className="flex items-center text-tertiary">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-label-bold text-label-bold ml-1">4.8</span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {RECENT_REVIEWS.map((rev, idx) => (
                <div key={idx} className="border-b border-surface-container pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div>
                      <p className="font-label-bold text-label-bold text-on-surface">{rev.author}</p>
                      <p className="text-[10px] text-on-surface-variant">{rev.time}</p>
                    </div>
                    <div className="flex text-yellow-400 shrink-0">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <span
                          key={sIdx}
                          className="material-symbols-outlined text-xs"
                          style={{ fontVariationSettings: sIdx < rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/vendor/performance"
            className="w-full py-4 text-center font-label-bold text-label-bold text-primary hover:bg-surface-container transition-colors border-t border-outline-variant cursor-pointer block"
          >
            Read All Reviews
          </Link>
        </div>
      </section>

      {/* Quick Actions (Bottom Row) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Link
          href="/vendor/inventory/manage"
          className="flex items-center justify-center gap-3 p-6 bg-primary text-white rounded-xl shadow-lg hover:scale-[1.02] transition-transform active:scale-95 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">
            add_circle
          </span>
          <div className="text-left">
            <span className="block font-label-bold text-label-bold">New Product</span>
            <span className="block text-[10px] opacity-70">List a new item</span>
          </div>
        </Link>
        <Link
          href="/vendor/inventory"
          className="flex items-center justify-center gap-3 p-6 bg-white text-primary border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:scale-[1.02] transition-transform active:scale-95 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-3xl">receipt_long</span>
          <div className="text-left">
            <span className="block font-label-bold text-label-bold text-primary">View Stock</span>
            <span className="block text-[10px] text-on-surface-variant">Manage inventory</span>
          </div>
        </Link>
        <button
          onClick={() => triggerActionNotification("Promotional campaign launched successfully!")}
          className="flex items-center justify-center gap-3 p-6 bg-white text-primary border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:scale-[1.02] transition-transform active:scale-95 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-3xl">campaign</span>
          <div className="text-left">
            <span className="block font-label-bold text-label-bold text-primary">Create Promo</span>
            <span className="block text-[10px] text-on-surface-variant">Boost shop reach</span>
          </div>
        </button>
        <button
          onClick={() => triggerActionNotification("Connecting with Support Representative...")}
          className="flex items-center justify-center gap-3 p-6 bg-white text-primary border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:scale-[1.02] transition-transform active:scale-95 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-3xl">support_agent</span>
          <div className="text-left">
            <span className="block font-label-bold text-label-bold text-primary">Get Help</span>
            <span className="block text-[10px] text-on-surface-variant">Support 24/7</span>
          </div>
        </button>
      </section>
    </div>
  );
}
