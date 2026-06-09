"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  price: number;
  stockQty: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  statusColor: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    sku: "KIH-TMT-12",
    name: "TMT Rebar 12mm x 12m",
    category: "Steel & Rebar",
    price: 8450,
    stockQty: 840,
    status: "In Stock",
    statusColor: "bg-emerald-100 text-emerald-800",
  },
  {
    sku: "KIH-CIM-50",
    name: "CIMERWA 32.5N Cement (50kg)",
    category: "Cement & Aggregates",
    price: 12200,
    stockQty: 2450,
    status: "In Stock",
    statusColor: "bg-emerald-100 text-emerald-800",
  },
  {
    sku: "KIH-PVC-110",
    name: "PVC Pipe 110mm x 6m",
    category: "Plumbing Systems",
    price: 34500,
    stockQty: 8,
    status: "Low Stock",
    statusColor: "bg-amber-100 text-amber-800",
  },
  {
    sku: "KIH-WTH-20L",
    name: "WeatherGuard 20L - White Paint",
    category: "Finishing & Paints",
    price: 68000,
    stockQty: 125,
    status: "In Stock",
    statusColor: "bg-emerald-100 text-emerald-800",
  },
  {
    sku: "KIH-MCB-63A",
    name: "63A Circuit Breaker (Triple Pole)",
    category: "Electrical Components",
    price: 15700,
    stockQty: 40,
    status: "In Stock",
    statusColor: "bg-emerald-100 text-emerald-800",
  },
  {
    sku: "KIH-TL-6060",
    name: "Porcelain Tiles 60x60 Carrara",
    category: "Finishing & Paints",
    price: 28500,
    stockQty: 0,
    status: "Out of Stock",
    statusColor: "bg-red-100 text-red-800",
  },
];

const CATEGORIES = ["All Products", "Steel & Rebar", "Cement & Aggregates", "Plumbing Systems", "Electrical Components", "Finishing & Paints"];

export default function StoreInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All Products");

  const handleDeleteItem = (sku: string) => {
    if (confirm(`Are you sure you want to delete SKU ${sku}?`)) {
      setInventory(inventory.filter((item) => item.sku !== sku));
    }
  };

  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCat === "All Products" || item.category === selectedCat;

      return matchesSearch && matchesCat;
    });
  }, [inventory, searchQuery, selectedCat]);

  return (
    <div className="w-full">
      {/* Store Header & Stats */}
      <section className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
            Store Inventory List
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Manage your Kigali Industrial Hub product details, current stocks, and unit pricing.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-surface-container-high px-4 py-2 rounded-lg flex flex-col min-w-[120px]">
            <span className="text-label-bold font-label-bold text-on-surface-variant text-[10px]">
              TOTAL ITEMS
            </span>
            <span className="text-headline-md font-headline-md text-primary font-bold">
              {inventory.length}
            </span>
          </div>
          <Link
            href="/vendor/inventory/manage"
            className="px-6 py-2.5 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg shadow-md hover:bg-primary-container transition-all flex items-center gap-2 active:scale-95 duration-100 shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Stock Item
          </Link>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <section className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all outline-none text-body-md text-on-surface"
            placeholder="Search stock by SKU, product name..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCat === cat
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Inventory Table Card */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-body-md">
            <thead>
              <tr className="bg-surface-container text-primary border-b border-outline-variant/20 font-label-bold">
                <th className="p-4">SKU / Code</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (RWF)</th>
                <th className="p-4">In Stock</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-on-surface-variant font-medium">
                    No matching products found in stock.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.sku} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4 font-mono font-bold text-xs text-primary">{item.sku}</td>
                    <td className="p-4 font-semibold text-on-surface text-sm">{item.name}</td>
                    <td className="p-4 text-on-surface-variant text-xs">{item.category}</td>
                    <td className="p-4 font-bold text-sm text-on-surface">
                      {item.price.toLocaleString()} RWF
                    </td>
                    <td className="p-4 font-bold text-sm text-on-surface">{item.stockQty}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.statusColor}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-2">
                        <Link
                          href={`/vendor/inventory/manage?edit=${item.sku}`}
                          className="w-8 h-8 rounded bg-primary-container text-on-primary-container hover:brightness-95 transition-all flex items-center justify-center cursor-pointer"
                          title="Edit Product"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </Link>
                        <button
                          onClick={() => handleDeleteItem(item.sku)}
                          className="w-8 h-8 rounded bg-error-container text-on-error-container hover:brightness-95 transition-all flex items-center justify-center cursor-pointer"
                          title="Delete Product"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
