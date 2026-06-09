"use client";

import React from "react";
import Link from "next/link";

export default function VendorPerformancePage() {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Hero Header Section */}
      <section className="relative h-[280px] flex items-center overflow-hidden rounded-2xl shadow-sm mb-8">
        <img
          alt="Industrial Hub"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx-Pcj8sX3QCqVfINALmLf24UTVLXVHCdhcwxO-jLPJejjMVglD9keU6g5o03DxtBQ1C_gR-z_Imlqr_mjdGOwtt7Nq63qHXWvE0GfCGcOCEX4y5f9PQkgfN7Z_70p-8owvb25voc09WRWfaiqJLysRitmjcLjihPLtMhrfT-tgEWQf8g-AoU8mA49ZjE1pmJclDmeV3RWDICjEhpCVveCfOhC-_YT29enRowA1f2Z47L9RNjpAnrG2IrnUiGl9rqbq9t3FblFC74"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-transparent"></div>
        <div className="relative px-8 w-full max-w-4xl z-20">
          <span className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-bold rounded-full mb-4">
            VERIFIED PERFORMANCE
          </span>
          <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-white mb-4 font-bold">
            Kigali Industrial Hub
          </h2>
          <p className="font-body-lg text-white/90 max-w-2xl leading-relaxed">
            Transparency is the foundation of every structure we help build. Explore our real-time performance metrics and delivery excellence data.
          </p>
        </div>
      </section>

      {/* KPI Bento Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/10 border-b-4 border-b-tertiary-fixed flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
          <div>
            <p className="font-label-bold text-on-surface-variant text-[10px] uppercase tracking-wider mb-2">
              Customer Satisfaction
            </p>
            <h3 className="font-headline-xl text-headline-md font-bold text-primary">98%</h3>
          </div>
          <div className="flex items-center gap-1 text-tertiary mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/10 border-b-4 border-b-primary-fixed flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
          <div>
            <p className="font-label-bold text-on-surface-variant text-[10px] uppercase tracking-wider mb-2">
              Avg. Response Time
            </p>
            <h3 className="font-headline-xl text-headline-md font-bold text-primary">
              2.0<span className="text-headline-md font-normal">hrs</span>
            </h3>
          </div>
          <p className="text-body-sm text-outline mt-4">Top 5% of Rwanda Vendors</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/10 border-b-4 border-b-secondary-fixed flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
          <div>
            <p className="font-label-bold text-on-surface-variant text-[10px] uppercase tracking-wider mb-2">
              Orders Completed
            </p>
            <h3 className="font-headline-xl text-headline-md font-bold text-primary">12k+</h3>
          </div>
          <div className="flex items-center gap-2 text-primary mt-4">
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            <span className="text-body-sm font-semibold">Reliable Logistics</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/10 border-b-4 border-b-outline-variant flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
          <div>
            <p className="font-label-bold text-on-surface-variant text-[10px] uppercase tracking-wider mb-2">
              Years in Service
            </p>
            <h3 className="font-headline-xl text-headline-md font-bold text-primary">8</h3>
          </div>
          <p className="text-body-sm text-outline mt-4">Established 2016</p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Delivery Success Rate Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h4 className="font-headline-md text-headline-md text-primary font-bold mb-1">
                Delivery Success Rate
              </h4>
              <p className="text-body-sm text-on-surface-variant">Last 6 months performance across Rwanda</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs text-on-surface-variant font-semibold">
                <span className="w-3 h-3 rounded-full bg-primary block"></span> On Time
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between h-64 gap-4 px-4 border-b border-outline-variant/20 relative">
            {/* Custom styled animated column bars */}
            <div className="flex-1 group relative h-full flex items-end">
              <div className="bg-primary-container/20 group-hover:bg-primary-container/40 transition-colors w-full rounded-t-lg h-[85%] absolute top-auto bottom-0"></div>
              <div className="bg-primary w-full rounded-t-lg h-[72%] relative z-10 transition-all group-hover:brightness-110"></div>
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-on-surface-variant">
                Jan
              </p>
            </div>
            <div className="flex-1 group relative h-full flex items-end">
              <div className="bg-primary-container/20 group-hover:bg-primary-container/40 transition-colors w-full rounded-t-lg h-[90%] absolute top-auto bottom-0"></div>
              <div className="bg-primary w-full rounded-t-lg h-[84%] relative z-10 transition-all group-hover:brightness-110"></div>
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-on-surface-variant">
                Feb
              </p>
            </div>
            <div className="flex-1 group relative h-full flex items-end">
              <div className="bg-primary-container/20 group-hover:bg-primary-container/40 transition-colors w-full rounded-t-lg h-[88%] absolute top-auto bottom-0"></div>
              <div className="bg-primary w-full rounded-t-lg h-[80%] relative z-10 transition-all group-hover:brightness-110"></div>
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-on-surface-variant">
                Mar
              </p>
            </div>
            <div className="flex-1 group relative h-full flex items-end">
              <div className="bg-primary-container/20 group-hover:bg-primary-container/40 transition-colors w-full rounded-t-lg h-[95%] absolute top-auto bottom-0"></div>
              <div className="bg-primary w-full rounded-t-lg h-[92%] relative z-10 transition-all group-hover:brightness-110"></div>
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-on-surface-variant">
                Apr
              </p>
            </div>
            <div className="flex-1 group relative h-full flex items-end">
              <div className="bg-primary-container/20 group-hover:bg-primary-container/40 transition-colors w-full rounded-t-lg h-[98%] absolute top-auto bottom-0"></div>
              <div className="bg-primary w-full rounded-t-lg h-[96%] relative z-10 transition-all group-hover:brightness-110"></div>
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-on-surface-variant">
                May
              </p>
            </div>
            <div className="flex-1 group relative h-full flex items-end">
              <div className="bg-primary-container/20 group-hover:bg-primary-container/40 transition-colors w-full rounded-t-lg h-[99%] absolute top-auto bottom-0"></div>
              <div className="bg-primary w-full rounded-t-lg h-[98%] relative z-10 transition-all group-hover:brightness-110"></div>
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-on-surface-variant">
                Jun
              </p>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-surface-container-highest dark:bg-inverse-surface p-6 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/10">
          <h4 className="font-headline-md text-headline-md text-primary font-bold mb-6">Popular Inventory</h4>
          <div className="space-y-6 flex-grow">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-label-bold">
                <span>REINFORCEMENT STEEL</span>
                <span className="text-primary font-bold">42%</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-label-bold">
                <span>PREMIUM CEMENT</span>
                <span className="text-primary font-bold">35%</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-label-bold">
                <span>QUARRY AGGREGATE</span>
                <span className="text-primary font-bold">15%</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-label-bold">
                <span>TIMBER &amp; LUMBER</span>
                <span className="text-primary font-bold">8%</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
          <Link
            href="/vendor/inventory"
            className="mt-8 text-primary font-label-bold flex items-center gap-2 hover:underline text-xs"
          >
            VIEW FULL INVENTORY
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Regional Trust Map */}
      <section className="mb-8">
        <div className="bg-surface-container-low rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-outline-variant/20 shadow-sm">
          <div className="p-8 flex flex-col justify-center">
            <h4 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">
              Nationwide Reliability
            </h4>
            <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Serving construction projects from the heart of Kigali to the furthest districts. Our delivery network ensures your materials arrive on site, on time, every time.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                </div>
                <div>
                  <p className="font-label-bold text-sm">Kigali Central</p>
                  <p className="text-xs text-outline font-medium">45min Avg. Delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                </div>
                <div>
                  <p className="font-label-bold text-sm">Musanze Hub</p>
                  <p className="text-xs text-outline font-medium">3hr Avg. Delivery</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[320px] md:h-auto bg-outline-variant/10 relative">
            <img
              alt="Coverage Map"
              className="w-full h-full object-cover grayscale opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaY6E8m6be5m1Yil6GzvEFz-ISp_xkWOCsl7_D65YTIRgTrCOKwVjZbK9i6y4Z3AK8LVNIOZoPQ4aFh8oZ7jJyGCmlFwXO38fq_M0JITFpHH5RblKv5KOLCqoJAy46RhhIL2_aIwcLvKtjTlBkQJO24YbsmR4_BTIDdhZknDBqhSzzrvhISypfnWai6kJreINr2a537xpbeU4Fsj9PagCOs8lZ93VM7Zynoh9WcjS-ueMaZNPFyJ03w1cPM9K42c7gtiG8pf9GhBI"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="bg-primary text-white px-6 py-2.5 rounded-full shadow-lg font-label-bold flex items-center gap-2 animate-pulse text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">radar</span>
                LIVE TRACKING ACTIVE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-6 text-center border-t border-outline-variant/20 mt-12">
        <p className="font-label-bold text-outline uppercase tracking-widest text-[10px] mb-8">
          Verified Standards &amp; Accreditations
        </p>
        <div className="flex flex-wrap justify-center gap-12 opacity-65 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[44px] text-primary">verified_user</span>
            <span className="text-[11px] font-bold mt-2 uppercase tracking-wide">ISO 9001 Certified</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[44px] text-primary">gavel</span>
            <span className="text-[11px] font-bold mt-2 uppercase tracking-wide">RSB Compliant</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[44px] text-primary">eco</span>
            <span className="text-[11px] font-bold mt-2 uppercase tracking-wide">Sustainable Sourced</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[44px] text-primary">handshake</span>
            <span className="text-[11px] font-bold mt-2 uppercase tracking-wide">Trusted Partner</span>
          </div>
        </div>
      </section>
    </div>
  );
}
