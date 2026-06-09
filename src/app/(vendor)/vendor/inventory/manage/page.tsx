"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Form component wrapped in Suspense because of useSearchParams
function InventoryManageFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSku = searchParams.get("edit");

  // Form Fields
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Steel & Rebar");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [status, setStatus] = useState("In Stock");
  const [description, setDescription] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load existing item details if editing
  useEffect(() => {
    if (editSku) {
      // Mock loading item
      setSku(editSku);
      setName("TMT Rebar 12mm x 12m");
      setCategory("Steel & Rebar");
      setPrice("8450");
      setStockQty("840");
      setStatus("In Stock");
      setDescription("Grade 500W High-Strength reinforcement steel. Standard 12m length.");
    } else {
      // Defaults for new item
      setSku(`KIH-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [editSku]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !stockQty) {
      alert("Please fill in all required fields.");
      return;
    }

    const msg = editSku
      ? `Successfully updated product ${name} (SKU: ${sku})!`
      : `Successfully added product ${name} (SKU: ${sku}) to inventory!`;

    setToastMessage(msg);

    // Redirect after 2 seconds
    setTimeout(() => {
      setToastMessage(null);
      router.push("/vendor/inventory");
    }, 2000);
  };

  return (
    <div className="w-full relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[99] bg-primary text-on-primary px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header and Breadcrumbs */}
      <section className="mb-8">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2 text-xs">
          <Link href="/vendor/inventory" className="hover:underline">
            Inventory
          </Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary font-bold">
            {editSku ? "Edit Product" : "Add New Product"}
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
          {editSku ? `Manage Item: ${sku}` : "Add Product to Inventory"}
        </h2>
        <p className="text-body-md text-on-surface-variant">
          Provide product specification details, stock availability thresholds, and unit pricing.
        </p>
      </section>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/10 p-6 md:p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SKU Field (Read-only if editing) */}
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">
                PRODUCT SKU / CODE
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                disabled={!!editSku}
                className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm text-primary font-bold disabled:opacity-75 disabled:cursor-not-allowed"
                required
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">
                PRODUCT NAME <span className="text-error">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Standard Red Clay Brick"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-body-md text-on-surface"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">
                CATEGORY <span className="text-error">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 bg-white border border-outline-variant rounded-lg appearance-none focus:ring-2 focus:ring-primary/20 outline-none text-body-md text-on-surface cursor-pointer"
                >
                  <option>Steel & Rebar</option>
                  <option>Cement & Aggregates</option>
                  <option>Plumbing Systems</option>
                  <option>Electrical Components</option>
                  <option>Finishing & Paints</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">
                UNIT PRICE (RWF) <span className="text-error">*</span>
              </label>
              <input
                type="number"
                placeholder="e.g. 150"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-body-md text-on-surface font-bold text-primary"
                required
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">
                INITIAL STOCK QTY <span className="text-error">*</span>
              </label>
              <input
                type="number"
                placeholder="e.g. 4250"
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-body-md text-on-surface font-bold text-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stock Status */}
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">
                STOCK AVAILABILITY STATUS
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 bg-white border border-outline-variant rounded-lg appearance-none focus:ring-2 focus:ring-primary/20 outline-none text-body-md text-on-surface cursor-pointer"
                >
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-label-bold text-on-surface-variant mb-2">
              TECHNICAL SPECIFICATION / DESCRIPTION
            </label>
            <textarea
              placeholder="Provide standard lengths, grading certifications, chemical compositions, etc."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-body-md text-on-surface resize-y"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
            <button
              type="submit"
              className="flex-1 h-12 bg-primary text-on-primary font-headline-md text-headline-md rounded-lg shadow-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">save</span>
              Save Product Details
            </button>
            <Link
              href="/vendor/inventory"
              className="px-8 h-12 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant text-primary font-headline-md text-headline-md rounded-lg flex items-center justify-center cursor-pointer transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Suspense wrapper to handle useSearchParams hook
export default function InventoryManagePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <InventoryManageFormContent />
    </Suspense>
  );
}
