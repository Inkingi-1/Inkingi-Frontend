"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useCategories } from "@/hooks/useApiData";
import { productsApi, categoryName, productImage, productPrice, vendorName } from "@/lib/api";
import { ApiProduct } from "@/lib/api/types";

export default function Marketplace() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      <MarketplaceContent />
    </Suspense>
  );
}

function stockLabel(product: ApiProduct): string {
  if (product.stock <= 0) return "Out of Stock";
  if (product.stock < 10) return "Limited Stock";
  if (product.featured) return "Featured";
  return "In Stock";
}

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const { addToCart, apiOnline } = useApp();
  const categories = useCategories();
  const categoryKey = categories.map((c) => c._id).join(",");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Recommended");
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
    const query = searchParams.get("q");
    if (query) setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: Record<string, string | number> = { limit: 50, page: 1 };
        if (searchQuery.trim()) params.search = searchQuery.trim();
        if (activeCategory !== "all") {
          const match = categories.find((c) => c.slug.includes(activeCategory) || c._id === activeCategory);
          if (match) params.category = match._id;
        }
        if (sortOption === "Lowest Price") {
          params.sortBy = "price";
          params.sortOrder = "asc";
        }
        const result = await productsApi.list(params);
        let list = result.data;
        if (sortOption === "Highest Rating") {
          list = [...list].sort((a, b) => b.averageRating - a.averageRating);
        }
        setProducts(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeCategory, searchQuery, sortOption, categoryKey]);

  const categoryPills = [
    { label: "All Materials", id: "all" },
    ...categories.map((c) => ({ label: c.name, id: c.slug })),
  ];

  const handleAddToCart = async (prod: ApiProduct) => {
    await addToCart({
      id: prod._id,
      productId: prod._id,
      title: prod.name,
      price: productPrice(prod),
      image: productImage(prod),
      category: categoryName(prod.category as never),
      supplier: vendorName(prod.vendor as never),
    });
    setAddedIds((prev) => new Set(prev).add(prod._id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(prod._id);
        return next;
      });
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-300">
      {!apiOnline && (
        <div className="bg-tertiary-container text-on-tertiary-container text-center text-sm py-2 px-4">
          API offline — start backend at localhost:3000 and run npm run seed
        </div>
      )}

      <div className="bg-surface py-4 px-margin-mobile md:px-margin-desktop overflow-x-auto hide-scrollbar flex items-center gap-3 border-b border-outline-variant/20">
        {categoryPills.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-label-bold text-label-bold shadow-sm transition-all duration-150 active:scale-95 cursor-pointer hover:shadow-md ${
              activeCategory === cat.id
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section className="px-margin-mobile md:px-margin-desktop py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant/30 rounded-lg text-body-sm font-medium hover:bg-surface-container hover:border-primary/30 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Filters</span>
          </button>
        </div>
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
          </select>
        </div>
      </section>

      {showFilters && (
        <section className="px-margin-mobile md:px-margin-desktop py-4 bg-surface-container-low border-b border-outline-variant/30 flex flex-wrap gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-primary uppercase">Search keyword</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-white border border-outline-variant/30 rounded-lg px-3 py-2 text-body-sm w-60 focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </section>
      )}

      <section className="flex-1 px-margin-mobile md:px-margin-desktop pb-24 lg:pb-margin-desktop mt-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-error mb-2">{error}</p>
            <p className="text-on-surface-variant text-sm">Ensure API is running: cd buildconnect-api && npm run start:dev</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-primary text-6xl opacity-30 mb-4">search_off</span>
            <h3 className="font-headline-md text-primary mb-2">No Materials Found</h3>
            <p className="text-on-surface-variant text-body-sm">Run npm run seed on the API to load demo products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div
                key={prod._id}
                className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 border border-outline-variant/10"
              >
                <div className="h-48 relative overflow-hidden bg-surface-container">
                  <Link href={`/marketplace/product/${prod._id}`}>
                    <img
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      src={productImage(prod)}
                    />
                  </Link>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-tertiary shadow-sm">
                    {stockLabel(prod)}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <Link href={`/marketplace/product/${prod._id}`}>
                      <h3 className="font-bold text-primary text-body-md line-clamp-1 hover:text-tertiary transition-colors cursor-pointer">
                        {prod.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-0.5 text-tertiary flex-shrink-0">
                      <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-xs font-bold">{prod.averageRating || "—"}</span>
                    </div>
                  </div>
                  <p className="text-outline text-xs mb-3">{vendorName(prod.vendor as never)}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-outline-variant font-bold uppercase tracking-wide">Price</span>
                      <span className="font-headline-md text-headline-md text-on-surface font-bold">
                        {productPrice(prod).toLocaleString()} RWF
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(prod)}
                      disabled={prod.stock <= 0}
                      aria-label={`Add ${prod.name} to cart`}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 duration-150 shadow cursor-pointer disabled:opacity-40 ${
                        addedIds.has(prod._id)
                          ? "bg-emerald-600 text-white"
                          : "bg-primary text-on-primary hover:bg-primary-container hover:text-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined">{addedIds.has(prod._id) ? "check" : "add"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
