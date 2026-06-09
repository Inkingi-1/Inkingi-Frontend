"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  categoryTag: string;
  supplier: string;
  rating: number;
  stockStatus: "In Stock" | "Limited Stock" | "Popular" | "Special Order" | "Available" | "Bulk Only" | "New";
  badge?: string;
  location: string;
}

const ALL_PRODUCTS: Product[] = [
  {
    id: "cement-cimerwa",
    title: "CIMERWA 32.5N Cement (50kg)",
    price: 12500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE67LnqKl_EWebcOgmZFsGOv_HO2gzYM9BBr-bcG-ki8dtD3CMgzZzPB0S46FEPUuz1CcFhvpKzLB8QDDYyaTp5-LmLLPGQf4wuuSbCHNMz0r8UuGqY2LYiu1i7YPFlHW5k42Z1RAs151787Sj6apji1WBysvn6rqldnakAri-ZHP5K6tqH_1leiGu-bxojBKtchCVetUHyZTUh-_yUGBV6DMY1lVgs7aZYKgec2-zeuVUh6hoccBjAJ4cSg4X1i_OlOxeza3N9ec",
    category: "Cement & Sand",
    categoryTag: "cement",
    supplier: "Huye Construction Supplies",
    rating: 4.8,
    stockStatus: "In Stock",
    location: "Huye",
  },
  {
    id: "steel-reinforcement",
    title: "Steel Reinforcement Rods (12mm)",
    price: 8200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuivYR99jfLpA5TXaPmbHW16r7k2iozjrhz_wdUaSMSv0gcQkJiJfRqZKLL2PV19DSFgH-LmRaqW7421kJxKezVyr8Hh1SFXwY6IzTcdSye3Uitlm6-FttoeWnwjhrteC64KyLEhang9aoQRxQ-T-lMLfHdFmhQ8AY4nsJt5Qwvfm6E4_A_HYesSpn2CvKLnwUiGxFjrZrTNjQWvxSvuLXRAgEELuhJyGZnHhrBQ8GYypvkfkjJdZCzDNi7IzfF3HOpdztIDSPU_A",
    category: "Steel Rods",
    categoryTag: "steel",
    supplier: "Kigali Metal Works Ltd",
    rating: 4.9,
    stockStatus: "Limited Stock",
    location: "Kigali",
  },
  {
    id: "safety-kit",
    title: "Pro-Shield Site Safety Kit",
    price: 22000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0lOsqUVQmiQ34nln3aho6YAa_UWO0d04xQnbfijOciDyCaQTXvJXzdUjU2vHaULyz9uS639ynlcfdl7pXonwbH2u5NT0i5eCL8mN7qv5rclNviUACgbnrVUBhc5-waVUysIlqkZGHwsr7xq3NrmpsJaDoDmhZmutTgSoUfxFPKHL5zlAzk5q8yOQijTV3zsosg6WPGuEUb8kntlhTl5a-UQoT-WmfwN0CyEO_VnMcLHBywOTkAIDwyoU7TkcA0FlI9T1FxX5R6xQ",
    category: "Safety Gear",
    categoryTag: "safety",
    supplier: "SafeBuild Rwanda",
    rating: 4.7,
    stockStatus: "Popular",
    location: "Kigali",
  },
  {
    id: "roofing-blue",
    title: "IBR Blue Roofing Sheets (3m)",
    price: 31500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9EpJ-ww7kvUBsuA6LJi_e0VI_A43V73m2cHU5BCqsty-JucCZZq0hJWcTOdIKMxi4LBPw_6rXVoFt6WKQZfo43t_IVji2e3QoDypRg2hFSQb07z-oGbfiTkaZoqb5lW-vM6n5omY2SagpDIxSdjatk3kEg1bqNALGLsiMvHTXzTg3yfai9KrFJ5x5bB7JdyqLe33AzlKcKVcnxi_Gb9neOmhE9S6Cna69Dpj0-GF4Ae_jyiCleBazxIk0JwuPbepqcAZswG_c_3c",
    category: "Roofing",
    categoryTag: "roofing",
    supplier: "TopRoof Rwanda",
    rating: 4.6,
    stockStatus: "Special Order",
    location: "Rubavu",
  },
  {
    id: "drill-hammer",
    title: "Industrial Hammer Drill 800W",
    price: 85000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2nJIVKY07vnxk4CXQyIZ31WvfRXHcRk3p34jLBlpBK3O-qRCpFaK9kczD42xSOtlWi0yxhDyc3inD00UmjuGe86TnNPZzjtO2FKgqQkObuaE7KwDGQCtCSxDbBiv6G9uFtwBF6qTVp72RGF0cybMxJ4tHTZcOGZfIIlpbxjiC6PRXsupARCeQ5qGSjKm9CDXzl6eFbNR2C8tgRNws00qW4_hWvrD5wDj1w70L7Zg22e2Ok8r_XFGaa7AXfSVKVKfJi4SKB1u4et8",
    category: "Power Tools",
    categoryTag: "tools",
    supplier: "PowerTools HQ",
    rating: 5.0,
    stockStatus: "Available",
    location: "Kigali",
  },
  {
    id: "pipe-pvc",
    title: "PVC Pressure Pipes (110mm)",
    price: 5400,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1a-pH5DIrY_MuN9stHN1f2-NsnsfKhqkVLd4I_ua_kWLtXeUBgXNdnMZq6XXm88L3vUzIVYPb3XvrBfCObFgGXQBIzcr-StIGPtUVSsh-ZgimGiON_x9GGYHZjo0-8ddChJIS2Ht4uxn-wkcYCvLIAtq6LziSuQGeZy6S2oRRUz1yd8KSTT5P4982Kag2WbRdTY3H6eo7q_3m-j6bkm7qEDwKAhTln-63-hNY5KW1ApJtIWcqf52z2D3gY-ymfnervkHzPC7sY-8",
    category: "Plumbing",
    categoryTag: "plumbing",
    supplier: "Musanze Hardware Hub",
    rating: 4.5,
    stockStatus: "Bulk Only",
    location: "Musanze",
  },
  {
    id: "sand-river",
    title: "Clean River Sand (Ton)",
    price: 180000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEvHusJhaTg4vr9Cvq13t80qFEVE6LT2LYgXf5CrlOqTJGom7XbpNuczY_E_ehh6RGIU0wUNtrJW5fGz3EyQRnxs3cAayM2UU97OzfMVt5jqgMzy2Au6di2lOV0QmVWILCDaT3GckfCykqx2bXgxO3cTWSA7mkTmF6I8AGZhx66CXNq-NYAfvOUAALjZ8Uq-yyIqC8lClY4BN1Q7stJwUpD5PFoU8S2ecaoNGzSqA2AcUjdb6UIgpFt_g0HUWuEvfW28qb_5NZHno",
    category: "Cement & Sand",
    categoryTag: "cement",
    supplier: "Eastern Logistics RW",
    rating: 4.4,
    stockStatus: "In Stock",
    location: "Kayonza",
  },
  {
    id: "wire-copper-2",
    title: "House Wiring Cable (2.5mm)",
    price: 45000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Pz6OiwZWmfKyR-ZTauGPferC6wfbceq8sHVjYRktIv-wqZIzrdq5tIMSAOFvapcmsh4d01CQjb7SAAj1baIjNx9tEASoASt0X9niv9F4sqRXJGLSM_xwGiUd4N_G1yzLS52OoDlpuEU7qcovvrs48Vg4EwFBDlmWs5Pi62_6_LorLx2b5dMi83hQWTJFHzbLtz5T8HrWZQBnT2ToXaGOJRJml7KvTmqtl1yUpt0XgZFwuum1MKhISKNShhWDVWhr8oSm5GbstpQ",
    category: "Electrical",
    categoryTag: "electrical",
    supplier: "Spark Electricals",
    rating: 4.8,
    stockStatus: "New",
    location: "Kigali",
  },
];

const CATEGORIES = [
  { label: "All Materials", tag: "all" },
  { label: "Cement & Sand", tag: "cement" },
  { label: "Steel Rods", tag: "steel" },
  { label: "Roofing", tag: "roofing" },
  { label: "Electrical", tag: "electrical" },
  { label: "Plumbing", tag: "plumbing" },
  { label: "Safety Gear", tag: "safety" },
  { label: "Power Tools", tag: "tools" },
];

export default function Marketplace() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <MarketplaceContent />
    </Suspense>
  );
}

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useApp();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Recommended");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [locationFilter, setLocationFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sync with search URL params
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
    
    const query = searchParams.get("q");
    if (query) setSearchQuery(query);

    const loc = searchParams.get("l");
    if (loc) setLocationFilter(loc.toLowerCase());
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...ALL_PRODUCTS];

    // Category Filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.categoryTag === activeCategory);
    }

    // Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.supplier.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Location Filter
    if (locationFilter !== "all" && locationFilter !== "") {
      const l = locationFilter.toLowerCase();
      result = result.filter((p) => p.location.toLowerCase().includes(l));
    }

    // Sorting
    if (sortOption === "Lowest Price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Highest Rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Nearest First") {
      // Kigali is treated as center/nearest in mock
      result.sort((a, b) => {
        if (a.location === "Kigali" && b.location !== "Kigali") return -1;
        if (a.location !== "Kigali" && b.location === "Kigali") return 1;
        return 0;
      });
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, sortOption, locationFilter]);

  const uniqueLocations = Array.from(new Set(ALL_PRODUCTS.map((p) => p.location)));

  return (
    <div className="animate-in fade-in duration-300">
      {/* Category Pills (Horizontal Scroll) */}
      <div className="bg-surface py-4 px-margin-mobile md:px-margin-desktop overflow-x-auto hide-scrollbar flex items-center gap-3 border-b border-outline-variant/20">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.tag}
            onClick={() => setActiveCategory(cat.tag)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-label-bold text-label-bold shadow-sm transition-all duration-150 active:scale-95 ${
              activeCategory === cat.tag
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Toolbar: Sort & Filter */}
      <section className="px-margin-mobile md:px-margin-desktop py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Dynamic Filters Row */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant/30 rounded-lg text-body-sm font-medium hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Filters</span>
            <span className="material-symbols-outlined text-sm">
              {showFilters ? "expand_less" : "expand_more"}
            </span>
          </button>

          {/* Quick Location Filter Indicator */}
          {locationFilter !== "all" && (
            <div className="bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
              <span>Location: {locationFilter}</span>
              <button onClick={() => setLocationFilter("all")}>
                <span className="material-symbols-outlined text-sm leading-none">close</span>
              </button>
            </div>
          )}
        </div>

        {/* Sort drop down */}
        <div className="flex items-center gap-3">
          <span className="text-on-surface-variant text-body-sm font-medium">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-transparent border-none text-primary font-bold text-body-sm focus:ring-0 cursor-pointer outline-none"
          >
            <option>Recommended</option>
            <option>Lowest Price</option>
            <option>Highest Rating</option>
            <option>Nearest First</option>
          </select>
        </div>
      </section>

      {/* Expanded Filters panel */}
      {showFilters && (
        <section className="px-margin-mobile md:px-margin-desktop py-4 bg-surface-container-low border-b border-outline-variant/30 flex flex-wrap gap-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-primary uppercase">Location</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-white border border-outline-variant/30 rounded-lg px-3 py-2 text-body-sm w-48 focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="all">All Regions</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc.toLowerCase()}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-primary uppercase">Search keyword</span>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-white border border-outline-variant/30 rounded-lg pl-3 pr-8 py-2 text-body-sm w-60 focus:ring-1 focus:ring-primary outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-outline hover:text-primary"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Product Grid (Responsive) */}
      <section className="flex-1 px-margin-mobile md:px-margin-desktop pb-24 lg:pb-margin-desktop mt-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-primary text-6xl opacity-30 mb-4">search_off</span>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">No Materials Found</h3>
            <p className="text-on-surface-variant text-body-sm max-w-sm">
              We couldn't find any products matching your search filters. Try clearing your filters or changing keywords.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setLocationFilter("all");
              }}
              className="mt-6 px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 border border-outline-variant/10"
                >
                  <div className="h-48 relative overflow-hidden bg-surface-container">
                    <Link href={`/marketplace/product/${prod.id}`}>
                      <img
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        src={prod.image}
                      />
                    </Link>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-tertiary shadow-sm">
                      {prod.stockStatus}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <Link href={`/marketplace/product/${prod.id}`}>
                        <h3 className="font-bold text-primary text-body-md line-clamp-1 hover:text-tertiary transition-colors cursor-pointer">
                          {prod.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-0.5 text-tertiary flex-shrink-0">
                        <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="text-xs font-bold">{prod.rating}</span>
                      </div>
                    </div>
                    <p className="text-outline text-xs mb-3">{prod.supplier} • {prod.location}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-outline-variant font-bold uppercase tracking-wide">Price</span>
                        <span className="font-headline-md text-headline-md text-on-surface font-bold">
                          {prod.price.toLocaleString()} RWF
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(prod)}
                        className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container hover:text-primary transition-all active:scale-90 duration-150 shadow"
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination/Infinite Scroll */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4">
              <p className="text-outline text-body-sm font-medium">
                Showing {filteredProducts.length} of {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-xl bg-primary text-on-primary font-bold text-body-sm shadow">1</button>
                <button className="w-10 h-10 rounded-xl border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors font-medium">2</button>
                <button className="w-10 h-10 rounded-xl border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
