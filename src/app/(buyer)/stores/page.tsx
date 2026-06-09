"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockStores } from "@/data/mockStores";

export default function StoreDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Rwanda");
  const [ratingFilter, setRatingFilter] = useState("Any");

  // Filter stores based on search, location, and rating selections
  const filteredStores = useMemo(() => {
    return mockStores.filter((store) => {
      // 1. Search Query
      const matchesSearch =
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Location filter
      let matchesLocation = true;
      if (locationFilter !== "All Rwanda") {
        matchesLocation = store.location.toLowerCase().includes(locationFilter.toLowerCase());
      }

      // 3. Rating filter
      let matchesRating = true;
      if (ratingFilter === "4.5+ Stars") {
        matchesRating = store.rating >= 4.5;
      } else if (ratingFilter === "4.0+ Stars") {
        matchesRating = store.rating >= 4.0;
      } else if (ratingFilter === "Verified Only") {
        matchesRating = store.verified;
      }

      return matchesSearch && matchesLocation && matchesRating;
    });
  }, [searchQuery, locationFilter, ratingFilter]);

  return (
    <div className="w-full">
      {/* Hero / Promotional Banner */}
      <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-7xl mx-auto">
        <section className="mb-lg relative rounded-xl overflow-hidden h-[240px] md:h-[320px] flex items-center shadow-lg group">
          <div className="absolute inset-0 z-0">
            <img
              alt="Hardware Warehouse"
              className="w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaXm_w4971uiX0tI6P_2-3fn0frafmX55AFIsq9YJGC1afRveEETTS1lYUt0qNPmTv7X_8IRllZU37EuqX6BLOwpuyt8Z6ZIpGIZplvUvEk3u59YXIZRcHk5snhMIYlKpdp18c409s_mQQKfZXdLAUEa5VTdWNdN21XCWtutAfZesANVaJY6iLjMgfa29Nb4ZEiPICMbTSJdgXZo6A9Ai_rfhU_6rptymGcD4qr2bO6eqJmAe2LPoRWC5fAjvopb96rRTzsQnnbpU"
            />
          </div>
          <div className="relative z-10 px-8 md:px-12 w-full max-w-2xl">
            <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full font-label-bold text-label-bold inline-block mb-4">
              PREMIUM PARTNERS
            </span>
            <h2 className="font-headline-lg text-headline-lg text-white mb-4">
              Top Rated Vendors 2024
            </h2>
            <p className="text-white/95 font-body-md mb-6 max-w-lg">
              Access Rwanda's most reliable quincailleries verified for quality, authentic industrial materials and guaranteed on-time site delivery.
            </p>
            <button className="bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-surface-container-low transition-colors shadow-xl active:scale-95 duration-150 cursor-pointer">
              Explore Curated List
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-[5]"></div>
        </section>

        {/* Search and Filter Bar */}
        <section className="mb-lg space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full h-14 pl-12 pr-4 bg-white border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-body-md text-on-surface"
                placeholder="Search for hardware stores, materials, or brands..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
              <div className="flex-shrink-0 relative">
                <select
                  className="h-14 pl-4 pr-10 bg-white border border-outline-variant rounded-xl appearance-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-body-md text-on-surface min-w-[180px]"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="All Rwanda">Location: All Rwanda</option>
                  <option value="Kigali">Kigali</option>
                  <option value="Musanze">Musanze</option>
                  <option value="Rubavu">Rubavu</option>
                  <option value="Huye">Huye</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  expand_more
                </span>
              </div>
              <div className="flex-shrink-0 relative">
                <select
                  className="h-14 pl-4 pr-10 bg-white border border-outline-variant rounded-xl appearance-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-body-md text-on-surface min-w-[160px]"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="Any">Rating: Any</option>
                  <option value="4.5+ Stars">4.5+ Stars</option>
                  <option value="4.0+ Stars">4.0+ Stars</option>
                  <option value="Verified Only">Verified Only</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  expand_more
                </span>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setLocationFilter("All Rwanda");
                  setRatingFilter("Any");
                }}
                className="h-14 px-6 bg-primary-container text-on-primary-container font-bold rounded-xl flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <span className="material-symbols-outlined">tune</span>
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Store Grid */}
        {filteredStores.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-outline-variant/30 shadow-sm">
            <span className="material-symbols-outlined text-outline text-5xl mb-4">storefront</span>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">No Stores Found</h3>
            <p className="text-on-surface-variant max-w-md mx-auto font-body-md">
              We couldn't find any hardware stores matching your search query or selected filters. Try clearing your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary-container/20 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-surface-container-high">
                    <img
                      alt={store.name}
                      className="w-full h-full object-cover"
                      src={store.image}
                    />
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {store.verified && (
                        <span className="bg-white/95 backdrop-blur-sm text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                          <span
                            className="material-symbols-outlined !text-[14px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            verified
                          </span>
                          VERIFIED VENDOR
                        </span>
                      )}
                      {store.expressDelivery && (
                        <span className="bg-tertiary-container/95 backdrop-blur-sm text-on-tertiary-container text-[10px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                          <span className="material-symbols-outlined !text-[14px]">
                            local_shipping
                          </span>
                          EXPRESS DELIVERY
                        </span>
                      )}
                      {store.newPartner && (
                        <span className="bg-secondary-container/95 backdrop-blur-sm text-on-secondary-container text-[10px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                          <span className="material-symbols-outlined !text-[14px]">
                            new_releases
                          </span>
                          NEW PARTNER
                        </span>
                      )}
                    </div>
                    <div className="absolute -bottom-6 right-6 w-16 h-16 bg-white rounded-xl shadow-md p-2 border border-outline-variant/30 flex items-center justify-center">
                      <img
                        alt={store.partnerName}
                        className="w-full h-full object-contain"
                        src={store.logo}
                      />
                    </div>
                  </div>
                  <div className="p-6 pt-8">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="font-headline-md text-headline-md text-primary leading-tight">
                        {store.name}
                      </h3>
                      <div className="flex items-center gap-1 text-tertiary shrink-0">
                        <span
                          className="material-symbols-outlined !text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="font-bold text-body-sm">{store.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 mb-6">
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <span className="material-symbols-outlined !text-[18px]">location_on</span>
                        <span className="text-body-sm">{store.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <span className="material-symbols-outlined !text-[18px]">inventory_2</span>
                        <span className="text-body-sm">{store.productsCount}+ Products</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6 flex items-center justify-between gap-4">
                  <span className="text-body-sm font-label-bold text-on-secondary-container">
                    {store.distance}
                  </span>
                  <Link
                    href={`/stores/${store.id}`}
                    className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold text-body-sm hover:bg-primary-container transition-colors group-hover:shadow-md active:scale-95 duration-150 flex items-center gap-2 cursor-pointer"
                  >
                    View Store
                    <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination / Load More */}
        <div className="mt-lg flex flex-col items-center gap-4">
          <button className="border border-primary text-primary font-bold px-12 py-3 rounded-lg hover:bg-primary-container/10 transition-colors active:scale-95 duration-150 cursor-pointer">
            Load More Quincailleries
          </button>
          <p className="text-body-sm text-on-surface-variant">
            Showing {filteredStores.length} of {mockStores.length} registered hardware stores
          </p>
        </div>
      </div>
    </div>
  );
}
