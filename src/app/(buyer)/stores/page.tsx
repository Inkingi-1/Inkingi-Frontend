"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useVendors } from "@/hooks/useApiData";
import { ApiVendor } from "@/lib/api/types";
import { pickVendorBanner } from "@/lib/productImages";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCaXm_w4971uiX0tI6P_2-3fn0frafmX55AFIsq9YJGC1afRveEETTS1lYUt0qNPmTv7X_8IRllZU37EuqX6BLOwpuyt8Z6ZIpGIZplvUvEk3u59YXIZRcHk5snhMIYlKpdp18c409s_mQQKfZXdLAUEa5VTdWNdN21XCWtutAfZesANVaJY6iLjMgfa29Nb4ZEiPICMbTSJdgXZo6A9Ai_rfhU_6rptymGcD4qr2bO6eqJmAe2LPoRWC5fAjvopb96rRTzsQnnbpU";

function vendorLocation(v: ApiVendor) {
  return `${v.district || v.city}, ${v.city}`;
}

function vendorImage(v: ApiVendor) {
  return pickVendorBanner(v);
}

export default function StoreDirectoryPage() {
  const { data, loading } = useVendors();
  const stores = data?.data ?? [];
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Rwanda");
  const [ratingFilter, setRatingFilter] = useState("Any");
  const storeGridRef = useRef<HTMLDivElement>(null);

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const loc = vendorLocation(store);
      const matchesSearch =
        store.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (store.businessDetails?.description || "").toLowerCase().includes(searchQuery.toLowerCase());

      let matchesLocation = true;
      if (locationFilter !== "All Rwanda") {
        matchesLocation = loc.toLowerCase().includes(locationFilter.toLowerCase());
      }

      let matchesRating = true;
      if (ratingFilter === "4.5+ Stars") matchesRating = store.averageRating >= 4.5;
      else if (ratingFilter === "4.0+ Stars") matchesRating = store.averageRating >= 4.0;
      else if (ratingFilter === "Verified Only") matchesRating = store.isVerified;

      return matchesSearch && matchesLocation && matchesRating;
    });
  }, [stores, searchQuery, locationFilter, ratingFilter]);

  const scrollToStores = () => {
    setRatingFilter("Verified Only");
    storeGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-7xl mx-auto">
        <section
          className="mb-lg relative rounded-2xl overflow-hidden min-h-[260px] md:min-h-[340px] flex items-center shadow-xl group"
          style={{
            backgroundImage: `url('${HERO_BG}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label="Top rated vendors promotion"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40 z-0" />
          <div className="absolute inset-0 bg-black/10 z-0" />
          <div className="relative z-10 w-full px-8 md:px-14 py-10 md:py-12">
            <div className="max-w-2xl">
              <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full font-label-bold text-label-bold inline-block mb-4">
                PREMIUM PARTNERS
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-4 leading-tight">
                Top Rated Vendors
              </h2>
              <p className="text-white/95 font-body-md text-body-md mb-8 max-w-[36rem] leading-relaxed">
                Access Rwanda&apos;s most reliable quincailleries verified for quality materials and on-time delivery.
              </p>
              <button
                type="button"
                onClick={scrollToStores}
                className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-surface-container-low hover:shadow-2xl transition-all shadow-xl active:scale-95 duration-150 cursor-pointer inline-flex items-center gap-2"
              >
                Explore Curated List
                <span className="material-symbols-outlined">arrow_downward</span>
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                type="text"
                placeholder="Search stores, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-outline-variant/30 rounded-xl focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-3 border border-outline-variant/30 rounded-xl focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            >
              <option>All Rwanda</option>
              <option>Kigali</option>
              <option>Gasabo</option>
              <option>Nyarugenge</option>
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-3 border border-outline-variant/30 rounded-xl focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            >
              <option>Any</option>
              <option>4.5+ Stars</option>
              <option>4.0+ Stars</option>
              <option>Verified Only</option>
            </select>
          </div>
        </section>

        <div ref={storeGridRef}>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
          ) : stores.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-on-surface-variant mb-2">No stores yet. Run npm run seed on the API.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => (
                <Link
                  key={store._id}
                  href={`/stores/${store._id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-lg hover:border-primary/20 transition-all group cursor-pointer"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      alt={store.storeName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={vendorImage(store)}
                    />
                    {store.isVerified && (
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-primary text-body-lg mb-1">{store.storeName}</h3>
                    <p className="text-on-surface-variant text-sm flex items-center gap-1 mb-3">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {vendorLocation(store)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-bold text-sm">{store.averageRating || "—"}</span>
                        <span className="text-outline text-xs">({store.reviewCount} reviews)</span>
                      </div>
                      <span className="text-primary font-bold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Visit <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
