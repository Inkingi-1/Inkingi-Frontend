"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";

interface StorefrontProduct {
  id: string;
  category: string;
  name: string;
  image: string;
  description: string;
  price: number;
  unit: string;
  minOrderText: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  stockText: string;
  badge?: string;
}

const PRODUCTS_CATALOG: StorefrontProduct[] = [
  {
    id: "cement-portland-425",
    category: "Cement",
    name: "Portland Cement 42.5N High Strength",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdVoVavop-JAIhBOXxiN02ieD6te24l2aewUwImohDtK2BB5w5Ro7rRQfTwu-5ypEMLsFIAzm6EqE0kKhJVRfn2BmLTBVNDhIzxICzE2FwUXak17HYyp9pN0to4A0VKFxofUVStUopGDt87zd3H6HCfyK8wE5BvkpqcYlRd8KRqM6pQK_FuKVNCoT4QygoyC-kcwlSp7Y1J6p3HHSxX8QEWKwcdD28TMBzIAHyk7lVlBDMxFfulX6YavtocH5QWNgqUQNiXE41lWc",
    description: "Rwandan manufactured premium cement for general masonry. 50kg bag.",
    price: 9500,
    unit: "bag",
    minOrderText: "Min order: 50 Bags",
    stockStatus: "In Stock",
    stockText: "IN STOCK",
    badge: "Bulk Available",
  },
  {
    id: "rebar-12mm-12m",
    category: "Steel & Rebar",
    name: "Reinforcement Bar (Rebar) 12mm x 12m",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-WmYCoH1D0Uz1T6Z9ek-lmC9NEOlejPPyBEmMioW7vOYWkWGgLVHEiHepjLjWtZoAW9UF05sO2XCuFbShVy8MraXKm4bhesAzTy0HloZHlwmBFMlDyvewsDpdRNe4nnNS8s4vn1bvJ2zYWTVWnsQflhcUwME1ZKACCy0HLU86x6Ev_AtCiHyyNt87BihJyfXmxh2yWbf4I8srWM3m7f-xPn76n2-tCMO-e2Ki2jOQEcbKEYkFG8uJyb0Ftsj00w7SllAC2gZw_ZM",
    description: "Grade 500W High-Strength reinforcement steel. Standard 12m length.",
    price: 14200,
    unit: "pc",
    minOrderText: "Min order: 20 Pcs",
    stockStatus: "In Stock",
    stockText: "IN STOCK",
  },
  {
    id: "hdpe-pipe-63mm",
    category: "Plumbing",
    name: "HDPE Pipe PN16 63mm (100m Roll)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr9QzRTfnl7FGpjEIPvsuosBoWk50-Dx3GrP3vwgBdm-FsLKrIW1UWbI0qR2fLgUETyXzpVoeciDKvIM0Lm4BGZky9lcMiBLAjwAbaLNtm9617s8FQTrFSg0pPdwvnkEq-pomOiOdEpyM1sSyfrCPRAylGv61oAos5lC0Pxuh3fKDpouotUZkqSk6njGCLzv252OKYlOx5W9b6CYnmEQstTnFi-LL33BVfaCzWDtZbbaOxJWEeH4FwR3emi_oT1n6I8bagYRZGuVQ",
    description: "Heavy-duty sewage and drainage pipe. Class 3 durability. 6m length.",
    price: 325000,
    unit: "roll",
    minOrderText: "Min order: 1 Roll",
    stockStatus: "Low Stock",
    stockText: "LOW STOCK",
    badge: "Popular",
  },
  {
    id: "pavers-80mm",
    category: "Cement",
    name: "Heavy Duty Interlocking Pavers 80mm",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXSruyuCCSzlT59eodOXcIjPVXMneBnf9QArtYKfRxq7XY489P6nbFWPA-c13_-lw2SgxYOhedc3N2Ea_bykPxzjrbB9SQD_vUnbmpsKlWI9gmqMq6EChwU4DYvBJy9rw61Kt0p_ciBWOyH355_TDKVWK-BuNON4IFNDzp6UAJDJllzkh9chJgnPP5dLvzwZNlJWjsa4fVh9jQYTh07jcxPZ76V-IpVBRt52eSVk4Yfdb6Au6nrbz6pff1jl1c0aJES_HUAO0Bihg",
    description: "Interlocking concrete blocks for driveways and heavy traffic areas.",
    price: 450,
    unit: "pc",
    minOrderText: "Min order: 500 Pcs",
    stockStatus: "In Stock",
    stockText: "IN STOCK",
  },
  {
    id: "conduit-wire-25",
    category: "Electrical",
    name: "Conduit Wire 2.5mm² Single Core (90m)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmid71XthRtDyUHPHJXSlOUe5sijD8RMdXZ_FXmxvRpoyOj50oODvh14FJdu5drKCBZncuyBSESElkzUpExPb3jxgqXbmDbXuXruB2L_5Ph28L2G26grWcejhnCfIXazcXNAM2lteSRtThHjOr0PS1ShOyNQOpjW425gj8d_Msj1QQbAETlj5dqzEXsHj-4oTDrX91qSzTSdiFBhtBRyI7qD34gefHagwmxOflIcQKhGHfo0XpQg4BS7PzFpdGgl0wwhYU8GRsv7k",
    description: "Durable copper wiring for domestic and industrial installation.",
    price: 42000,
    unit: "roll",
    minOrderText: "Min order: 5 Rolls",
    stockStatus: "In Stock",
    stockText: "IN STOCK",
  },
  {
    id: "bolts-m16-150",
    category: "Plumbing",
    name: "Industrial Structural Bolts M16 x 150mm",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiBAC6O-zYPL0OZecdG7Z9ZKM_xZ5oXf0FXUPkKZN2O81z_BMmZTbjJvf4Da_lV4U1F_PyMUuirhDUdRhEE89PH955eSXSo9PQhxPa3P6scXNsulyqpBw0CbzKQyBmLcmkX7fMGIa-Ir1yfi6OQHc74yOCrdHZ6fDODqaw6N3yUjHXy1UkQ7MBsm3cApy3bKJN4OmSDnZf7cCNV338UcBfbBtxu6lTHMsiPviyHOTnP0tnh7LmUl6zN-kdqLnB3XsSZ2rm725qZKs",
    description: "High tensile steel bolts with hex head for structure connections.",
    price: 1800,
    unit: "pc",
    minOrderText: "Restocking soon",
    stockStatus: "Out of Stock",
    stockText: "OUT OF STOCK",
    badge: "Limited",
  },
];

const CATEGORIES = ["All Products", "Cement", "Steel & Rebar", "Plumbing", "Electrical"];

export default function VendorStorefrontPage() {
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const handleAddToCart = (product: StorefrontProduct) => {
    if (product.stockStatus === "Out of Stock") return;

    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      supplier: "Kigali Industrial Hub",
    });

    setAddedItemName(product.name);
    setTimeout(() => {
      setAddedItemName(null);
    }, 2000);
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS_CATALOG];

    // Category filter
    if (selectedCategory !== "All Products") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // In Stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.stockStatus !== "Out of Stock");
    }

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <div className="w-full relative">
      {/* Toast Notification */}
      {addedItemName && (
        <div className="fixed top-6 right-6 z-[99] bg-primary text-on-primary px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-bold">Added {addedItemName} to shopping cart!</span>
        </div>
      )}

      {/* Brand Banner */}
      <section className="relative h-48 md:h-[300px] w-full overflow-hidden rounded-2xl shadow-sm mb-8">
        <img
          alt="Kigali Industrial Park"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2V3kc0s-hDN4IQQgG6nC7-GuPtjl9q4ZAgJbs3F8zFe8hWPO1mTZtJkGovjOZcnf31nwsKGCpwutHV6qrlMli0haUSI9swUezYMTS3-cG1rnCFAvr3-VTgMOsFma2DD9waGz8UGEXcy8dCST51b1UyEv5kqDUroL_S_bNqO7cb1vBQ0hXouAYlZLDjn1-ovo86Kqtaug8jE_QYGodNSyrtho_czksrR1QE_u_RuHN2c39UY7MaDVwKZa0i6kVWbj4Pk7KFzeXFLw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
        <div className="absolute bottom-6 left-6 flex items-end gap-4 z-20">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white p-2 shadow-lg border border-outline-variant/20 overflow-hidden flex items-center justify-center">
            <span className="font-headline-md text-primary font-extrabold leading-tight block text-center">
              KIH
            </span>
          </div>
          <div className="mb-1 text-white">
            <h2 className="font-headline-lg text-white font-bold leading-none mb-1">
              Kigali Industrial Hub
            </h2>
            <p className="text-xs opacity-95">Verified Partner • Nyarugenge, Kigali</p>
          </div>
        </div>
      </section>

      {/* Content Layout: Tabs & Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Category Sidebar */}
        <aside className="lg:col-span-3 space-y-6 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
          <div>
            <h3 className="font-label-bold text-label-bold text-outline uppercase mb-4 tracking-widest">
              Categories
            </h3>
            <nav className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = cat === "All Products"
                  ? PRODUCTS_CATALOG.length
                  : PRODUCTS_CATALOG.filter((p) => p.category === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary-container text-on-primary-container font-bold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-lg">
                        {cat === "All Products"
                          ? "all_inclusive"
                          : cat === "Cement"
                          ? "foundation"
                          : cat === "Steel & Rebar"
                          ? "architecture"
                          : cat === "Plumbing"
                          ? "plumbing"
                          : "electrical_services"}
                      </span>
                      <span className="text-body-sm font-medium">{cat}</span>
                    </div>
                    <span className="text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-outline-variant/30">
            <h3 className="font-label-bold text-label-bold text-outline uppercase mb-4 tracking-widest">
              Filters
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="instock"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="instock"
                  className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none"
                >
                  Available in Stock
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-outline-variant/20 shadow-sm">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all outline-none text-body-md text-on-surface"
                placeholder="Search products from this vendor..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative shrink-0">
              <select
                className="w-full h-11 pl-4 pr-10 bg-white border border-outline-variant/30 rounded-lg appearance-none focus:ring-2 focus:ring-primary/20 outline-none text-body-sm text-on-surface-variant font-medium cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Product Name</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-sm">
                expand_more
              </span>
            </div>
          </div>

          {/* Grid list */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-outline-variant/20 shadow-sm">
              <span className="material-symbols-outlined text-outline text-5xl mb-4">inventory_2</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">No Products Available</h3>
              <p className="text-on-surface-variant max-w-md mx-auto font-body-md">
                There are no materials in this category matching your search criteria. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 group overflow-hidden border border-transparent hover:border-outline-variant/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square overflow-hidden bg-surface-container-high">
                      <img
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={prod.image}
                      />
                      {prod.badge && (
                        <div className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-label-bold uppercase shadow-sm">
                          {prod.badge}
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      <p className="text-outline text-[10px] font-bold uppercase tracking-wider">
                        {prod.category}
                      </p>
                      <h4 className="font-headline-md text-primary text-[17px] leading-tight font-bold line-clamp-2 min-h-[44px]">
                        {prod.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                            prod.stockStatus === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : prod.stockStatus === "Low Stock"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {prod.stockText}
                        </span>
                        <span className="text-outline text-[11px] font-medium">{prod.minOrderText}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-outline-variant/10">
                    <span className="font-headline-md text-on-surface font-bold text-lg">
                      {prod.price.toLocaleString()} RWF{" "}
                      <span className="text-xs font-normal text-outline">/{prod.unit}</span>
                    </span>
                    {prod.stockStatus === "Out of Stock" ? (
                      <button className="w-10 h-10 bg-outline-variant/20 text-outline rounded-lg flex items-center justify-center cursor-not-allowed">
                        <span className="material-symbols-outlined">notification_add</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className="w-10 h-10 bg-primary text-on-primary hover:bg-primary-container rounded-lg flex items-center justify-center transition-all active:scale-90 shadow-md cursor-pointer"
                      >
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
