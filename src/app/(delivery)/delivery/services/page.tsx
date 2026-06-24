"use client";

import React, { useState } from "react";
import Link from "next/link";

const ZONES = [
  { id: "metro", label: "Kigali metro", multiplier: 1 },
  { id: "urban", label: "Urban districts", multiplier: 1.35 },
  { id: "rural", label: "Rural / upcountry", multiplier: 1.85 },
];

const TIERS = [
  {
    name: "Standard",
    price: "From RWF 2,000",
    desc: "Same-day delivery within Kigali for loads under 500 kg.",
    icon: "local_shipping",
  },
  {
    name: "Heavy haul",
    price: "From RWF 8,500",
    desc: "Flatbed and tipper trucks for cement, steel, and aggregates.",
    icon: "fire_truck",
  },
  {
    name: "Express",
    price: "From RWF 4,500",
    desc: "Priority dispatch with live GPS tracking for urgent site needs.",
    icon: "bolt",
  },
];

function estimateFee(weightKg: number, zoneId: string): number {
  const zone = ZONES.find((z) => z.id === zoneId) ?? ZONES[0];
  const base = 2000;
  const perKg = 45;
  return Math.round((base + weightKg * perKg) * zone.multiplier);
}

export default function LogisticsOffersPage() {
  const [weight, setWeight] = useState("50");
  const [zone, setZone] = useState("metro");
  const [toast, setToast] = useState<string | null>(null);

  const weightNum = Math.max(0, Number(weight) || 0);
  const estimate = estimateFee(weightNum, zone);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="w-full pb-20 lg:pb-0">
      {toast && (
        <div className="fixed top-20 right-6 z-[99] bg-primary text-on-primary px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <span className="material-symbols-outlined">check_circle</span>
          <span className="font-bold text-sm">{toast}</span>
        </div>
      )}

      <section className="mb-8">
        <h1 className="font-headline-lg text-primary font-bold">Logistics offers</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Fleet coverage, service tiers, and instant delivery fee estimates for Rwanda.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {TIERS.map((tier) => (
          <div key={tier.name} className="bg-white rounded-xl p-6 border border-outline-variant/15 shadow-sm">
            <span className="material-symbols-outlined text-primary text-3xl mb-3">{tier.icon}</span>
            <h3 className="font-bold text-primary text-lg">{tier.name}</h3>
            <p className="text-tertiary font-bold text-sm mt-1">{tier.price}</p>
            <p className="text-on-surface-variant text-sm mt-3 leading-relaxed">{tier.desc}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl p-6 md:p-8 border border-outline-variant/15 shadow-sm">
          <h2 className="font-bold text-primary text-lg mb-4">Delivery fee calculator</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-2">Load weight (kg)</label>
              <input
                type="number"
                min={0}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full h-12 px-4 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-2">Delivery zone</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full h-12 px-4 border border-outline-variant rounded-lg outline-none cursor-pointer"
              >
                {ZONES.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-primary-container text-on-primary-container rounded-xl p-5">
              <p className="text-xs font-bold uppercase opacity-80">Estimated fee</p>
              <p className="font-headline-lg font-bold mt-1">RWF {estimate.toLocaleString()}</p>
              <p className="text-xs mt-2 opacity-80">Indicative quote — final fee may vary by access road and load type.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 md:p-8 border border-outline-variant/15 shadow-sm">
          <h2 className="font-bold text-primary text-lg mb-4">Coverage & fleet</h2>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
              Kigali City — Gasabo, Kicukiro, Nyarugenge
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
              Eastern corridor — Rwamagana, Kayonza, Kibungo
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
              Fleet: pickups, 3.5t box trucks, 10t flatbeds
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/orders/track"
              className="flex-1 text-center px-5 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm hover:brightness-110 transition-all"
            >
              Track shipment
            </Link>
            <button
              type="button"
              onClick={() => showToast("Quote request sent — our team will call you within 2 hours.")}
              className="flex-1 px-5 py-3 border border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary/5 transition-all"
            >
              Request quote
            </button>
            <button
              type="button"
              onClick={() => showToast("Support line: +250 788 000 004 — available 24/7.")}
              className="flex-1 px-5 py-3 border border-outline-variant text-on-surface rounded-xl font-bold text-sm hover:bg-surface-container transition-all"
            >
              Contact logistics
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
