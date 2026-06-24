"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PortalAuth } from "@/components/PortalAuth";
import { productsApi, categoriesApi } from "@/lib/api";
import { ApiCategory } from "@/lib/api/types";
import { resolveMaterialImage } from "@/lib/productImages";
import { ApiError } from "@/lib/api/client";
import {
  INVENTORY_CATEGORY_LABELS,
  resolveCategoryId,
  categoryLabelFromApi,
} from "@/lib/vendorCategoryMap";

function InventoryManageFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState(INVENTORY_CATEGORY_LABELS[0]);
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(!!editId);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!editId) {
      setSku(`BC-${Math.floor(1000 + Math.random() * 9000)}`);
      return;
    }
    setLoading(true);
    productsApi
      .get(editId)
      .then((p) => {
        setSku(p.sku);
        setName(p.name);
        setCategory(categoryLabelFromApi(p.category as never));
        setPrice(String(p.discountPrice ?? p.price));
        setStockQty(String(p.stock));
        setDescription(p.description || "");
      })
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !price || !stockQty || !categories.length) {
      setError("Please fill in all required fields.");
      return;
    }

    const categoryId = resolveCategoryId(category, categories);
    if (!categoryId) {
      setError("No category available. Run npm run seed on the API.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        description: description || `${name} — listed on BuildConnect`,
        category: categoryId,
        price: Number(price),
        stock: Number(stockQty),
        sku,
        images: [resolveMaterialImage(name, category)],
        tags: [category.toLowerCase().split(" ")[0]],
      };

      if (editId) {
        await productsApi.update(editId, {
          name: payload.name,
          description: payload.description,
          category: payload.category,
          price: payload.price,
          stock: payload.stock,
          images: payload.images,
          tags: payload.tags,
          isAvailable: Number(stockQty) > 0,
        });
        setToastMessage(`Updated ${name} in inventory`);
      } else {
        await productsApi.create(payload);
        setToastMessage(`Added ${name} to inventory`);
      }

      setTimeout(() => {
        router.push("/vendor/inventory");
        router.refresh();
      }, 1200);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <PortalAuth requiredRole="vendor" />

      {toastMessage && (
        <div className="fixed top-6 right-6 z-[99] bg-primary text-on-primary px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-bold">{toastMessage}</span>
        </div>
      )}

      <section className="mb-8">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2 text-xs">
          <Link href="/vendor/inventory" className="hover:underline">Inventory</Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary font-bold">{editId ? "Edit product" : "Add new product"}</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
          {editId ? "Edit product" : "Add product to inventory"}
        </h2>
        <p className="text-body-md text-on-surface-variant">
          Saved products appear on inventory, dashboard, and the public marketplace.
        </p>
      </section>

      {error && (
        <div className="mb-4 bg-error-container text-on-error-container p-3 rounded-xl text-sm">{error}</div>
      )}

      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/10 p-6 md:p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">Product SKU / code</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                disabled={!!editId}
                className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant rounded-lg outline-none font-mono text-sm text-primary font-bold disabled:opacity-75"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">
                Product name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg outline-none cursor-pointer"
              >
                {INVENTORY_CATEGORY_LABELS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">Unit price (RWF)</label>
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg outline-none font-bold text-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-label-bold text-on-surface-variant mb-2">Stock quantity</label>
              <input
                type="number"
                min={0}
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg outline-none font-bold text-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-label-bold text-on-surface-variant mb-2">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 bg-white border border-outline-variant rounded-lg outline-none resize-y"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 h-12 bg-primary text-on-primary font-bold rounded-lg shadow-md hover:bg-primary/90 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">save</span>
              {submitting ? "Saving..." : editId ? "Update product" : "Add to inventory"}
            </button>
            <Link
              href="/vendor/inventory"
              className="px-8 h-12 bg-surface-container-high border border-outline-variant text-primary font-bold rounded-lg flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function InventoryManagePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      }
    >
      <InventoryManageFormContent />
    </Suspense>
  );
}
