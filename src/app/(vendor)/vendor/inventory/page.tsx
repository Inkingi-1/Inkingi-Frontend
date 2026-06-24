"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PortalAuth } from "@/components/PortalAuth";
import { vendorsApi, productsApi } from "@/lib/api";
import { ApiProduct } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";
import { categoryLabelFromApi, stockStatusFromQty } from "@/lib/vendorCategoryMap";

export default function StoreInventoryPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All Products");

  const loadProducts = useCallback(() => {
    setLoading(true);
    setLoadError("");
    vendorsApi
      .myProducts()
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        setProducts([]);
        setLoadError(err instanceof ApiError ? err.message : "Could not load inventory");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts, pathname]);

  const categories = useMemo(() => {
    const labels = new Set(products.map((p) => categoryLabelFromApi(p.category as never)));
    return ["All Products", ...Array.from(labels)];
  }, [products]);

  const handleDeleteItem = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}" from inventory?`)) return;
    try {
      await productsApi.remove(id);
      loadProducts();
    } catch {
      alert("Could not delete product. Sign in as vendor@buildconnect.rw");
    }
  };

  const filteredItems = useMemo(() => {
    return products.filter((item) => {
      const catLabel = categoryLabelFromApi(item.category as never);
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        catLabel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCat === "All Products" || catLabel === selectedCat;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCat]);

  return (
    <div className="w-full">
      <PortalAuth requiredRole="vendor" />

      {loadError && (
        <div className="mb-4 bg-error-container text-on-error-container p-3 rounded-xl text-sm flex items-center justify-between gap-4">
          <span>{loadError}</span>
          <button type="button" onClick={loadProducts} className="font-bold underline shrink-0">
            Retry
          </button>
        </div>
      )}

      <section className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold">Store inventory list</h2>
          <p className="text-body-md text-on-surface-variant">
            Live products from your store — synced with the marketplace and dashboard.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-surface-container-high px-4 py-2 rounded-lg flex flex-col min-w-[120px]">
            <span className="text-label-bold font-label-bold text-on-surface-variant text-[10px]">Total items</span>
            <span className="text-headline-md font-headline-md text-primary font-bold">{products.length}</span>
          </div>
          <Link
            href="/vendor/inventory/manage"
            className="px-6 py-2.5 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg shadow-md hover:bg-primary-container transition-all flex items-center gap-2 active:scale-95 duration-100 shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add stock item
          </Link>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all outline-none text-body-md text-on-surface"
            placeholder="Search stock by SKU, product name..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
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

      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-outline-variant/10">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-body-md">
              <thead>
                <tr className="bg-surface-container text-primary border-b border-outline-variant/20 font-label-bold">
                  <th className="p-4">SKU / Code</th>
                  <th className="p-4">Product name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price (RWF)</th>
                  <th className="p-4">In stock</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-on-surface-variant font-medium">
                      No products yet.{" "}
                      <Link href="/vendor/inventory/manage" className="text-tertiary font-bold hover:underline">
                        Add your first item
                      </Link>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const st = stockStatusFromQty(item.stock);
                    const catLabel = categoryLabelFromApi(item.category as never);
                    return (
                      <tr key={item._id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="p-4 font-mono font-bold text-xs text-primary">{item.sku}</td>
                        <td className="p-4 font-semibold text-on-surface text-sm">{item.name}</td>
                        <td className="p-4 text-on-surface-variant text-xs">{catLabel}</td>
                        <td className="p-4 font-bold text-sm text-on-surface">
                          {(item.discountPrice ?? item.price).toLocaleString()} RWF
                        </td>
                        <td className="p-4 font-bold text-sm text-on-surface">{item.stock}</td>
                        <td className="p-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${st.color}`}>{st.label}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center items-center gap-2">
                            <Link
                              href={`/vendor/inventory/manage?edit=${item._id}`}
                              className="w-8 h-8 rounded bg-primary-container text-on-primary-container hover:brightness-95 transition-all flex items-center justify-center cursor-pointer"
                              title="Edit product"
                            >
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(item._id, item.name)}
                              className="w-8 h-8 rounded bg-error-container text-on-error-container hover:brightness-95 transition-all flex items-center justify-center cursor-pointer"
                              title="Delete product"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
