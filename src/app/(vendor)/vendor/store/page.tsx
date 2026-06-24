"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { PortalAuth } from "@/components/PortalAuth";
import { useVendorQuote } from "@/context/VendorQuoteContext";
import { vendorsApi, productImage, productPrice, vendorBannerImage, vendorLogoImage } from "@/lib/api";
import { ApiProduct, ApiVendor } from "@/lib/api/types";
import { categoryLabelFromApi, stockStatusFromQty } from "@/lib/vendorCategoryMap";

function categoryIcon(label: string): string {
  if (label === "All Products") return "all_inclusive";
  if (label.includes("Cement")) return "foundation";
  if (label.includes("Steel")) return "architecture";
  if (label.includes("Plumb")) return "plumbing";
  if (label.includes("Electric")) return "electrical_services";
  if (label.includes("Paint") || label.includes("Finish")) return "format_paint";
  if (label.includes("Roof")) return "roofing";
  return "inventory_2";
}

export default function VendorStorefrontPage() {
  const { addItem, itemCount } = useVendorQuote();
  const [store, setStore] = useState<ApiVendor | null>(null);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([vendorsApi.getMe(), vendorsApi.myProducts()])
      .then(([vendor, res]) => {
        setStore(vendor);
        setProducts(res.data);
      })
      .catch(() => {
        setStore(null);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const labels = new Set(products.map((p) => categoryLabelFromApi(p.category as never)));
    return ["All Products", ...Array.from(labels)];
  }, [products]);

  const handleAddToQuote = (product: ApiProduct) => {
    const stock = product.stock ?? 0;
    if (stock <= 0) return;

    const status = stockStatusFromQty(stock);
    addItem({
      id: product._id,
      productId: product._id,
      name: product.name,
      price: productPrice(product),
      image: productImage(product),
      category: categoryLabelFromApi(product.category as never),
    });

    setAddedItemName(product.name);
    setTimeout(() => setAddedItemName(null), 2000);
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "All Products") {
      list = list.filter((p) => categoryLabelFromApi(p.category as never) === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          categoryLabelFromApi(p.category as never).toLowerCase().includes(query) ||
          (p.description || "").toLowerCase().includes(query)
      );
    }

    if (inStockOnly) {
      list = list.filter((p) => (p.stock ?? 0) > 0);
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => productPrice(a) - productPrice(b));
    } else if (sortBy === "price-high") {
      list.sort((a, b) => productPrice(b) - productPrice(a));
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy]);

  const storeName = store?.storeName ?? "Your store";
  const location = store?.city ? `${store.city}, ${store.district || "Rwanda"}` : "Rwanda";

  return (
    <div className="w-full relative">
      <PortalAuth requiredRole="vendor" />

      {addedItemName && (
        <div className="fixed top-6 right-6 z-[99] bg-primary text-on-primary px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-bold">
            Added {addedItemName} to storefront cart.{" "}
            <Link href="/vendor/store/cart" className="underline">
              View cart ({itemCount})
            </Link>
          </span>
        </div>
      )}

      <section className="relative h-48 md:h-[300px] w-full overflow-hidden rounded-2xl shadow-sm mb-8">
        <img
          alt={storeName}
          className="w-full h-full object-cover"
          src={store ? vendorBannerImage(store) : "https://images.unsplash.com/photo-1581094794329-cd2b2c0a0f0f?w=1200"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
        <div className="absolute bottom-6 left-6 flex items-end gap-4 z-20">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white p-2 shadow-lg border border-outline-variant/20 overflow-hidden flex items-center justify-center">
            {store ? (
              <img src={vendorLogoImage(store)} alt={storeName} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="font-headline-md text-primary font-extrabold leading-tight block text-center">BC</span>
            )}
          </div>
          <div className="mb-1 text-white">
            <h2 className="font-headline-lg text-white font-bold leading-none mb-1">{storeName}</h2>
            <p className="text-xs opacity-95">Verified partner • {location}</p>
          </div>
        </div>
        <Link
          href="/vendor/store/cart"
          className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-2 bg-white/95 text-primary rounded-xl font-bold text-sm shadow-md hover:bg-white transition-colors"
        >
          <span className="material-symbols-outlined text-lg">shopping_cart</span>
          Storefront cart
          {itemCount > 0 && (
            <span className="bg-tertiary text-on-tertiary text-xs font-bold px-2 py-0.5 rounded-full">{itemCount}</span>
          )}
        </Link>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-3 space-y-6 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
            <div>
              <h3 className="font-label-bold text-label-bold text-outline uppercase mb-4 tracking-widest">Categories</h3>
              <nav className="space-y-1">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const count =
                    cat === "All Products"
                      ? products.length
                      : products.filter((p) => categoryLabelFromApi(p.category as never) === cat).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors cursor-pointer ${
                        isActive
                          ? "bg-primary-container text-on-primary-container font-bold"
                          : "text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">{categoryIcon(cat)}</span>
                        <span className="text-body-sm font-medium">{cat}</span>
                      </div>
                      <span className="text-xs opacity-70">{count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-outline-variant/30">
              <h3 className="font-label-bold text-label-bold text-outline uppercase mb-4 tracking-widest">Filters</h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="instock"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                />
                <label htmlFor="instock" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none">
                  Available in stock
                </label>
              </div>
            </div>

            <Link
              href="/vendor/inventory/manage"
              className="block w-full text-center px-4 py-2.5 bg-tertiary text-on-tertiary rounded-lg font-bold text-sm hover:brightness-110 transition-all"
            >
              Add new product
            </Link>
          </aside>

          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-outline-variant/20 shadow-sm">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input
                  className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all outline-none text-body-md text-on-surface"
                  placeholder="Search products from your inventory..."
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
                  <option value="name">Product name</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-sm">
                  expand_more
                </span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-outline-variant/20 shadow-sm">
                <span className="material-symbols-outlined text-outline text-5xl mb-4">inventory_2</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">No products yet</h3>
                <p className="text-on-surface-variant max-w-md mx-auto font-body-md mb-6">
                  Add items in inventory — they appear here on your storefront automatically.
                </p>
                <Link
                  href="/vendor/inventory/manage"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm"
                >
                  <span className="material-symbols-outlined">add</span>
                  Add stock item
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => {
                  const stock = prod.stock ?? 0;
                  const status = stockStatusFromQty(stock);
                  const price = productPrice(prod);
                  const image = productImage(prod);
                  const category = categoryLabelFromApi(prod.category as never);
                  const minOrder = stock > 0 ? `${stock} in stock` : "Out of stock";

                  return (
                    <div
                      key={prod._id}
                      className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 group overflow-hidden border border-transparent hover:border-outline-variant/20 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-square overflow-hidden bg-surface-container-high">
                          <img
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            src={image}
                          />
                          {prod.featured && (
                            <div className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-label-bold uppercase shadow-sm">
                              Featured
                            </div>
                          )}
                        </div>
                        <div className="p-5 space-y-2">
                          <p className="text-outline text-[10px] font-bold uppercase tracking-wider">{category}</p>
                          <h4 className="font-headline-md text-primary text-[17px] leading-tight font-bold line-clamp-2 min-h-[44px]">
                            {prod.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${status.color}`}>
                              {status.label}
                            </span>
                            <span className="text-outline text-[11px] font-medium">{minOrder}</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-outline-variant/10">
                        <span className="font-headline-md text-on-surface font-bold text-lg">
                          {price.toLocaleString()} RWF
                        </span>
                        {stock <= 0 ? (
                          <Link
                            href={`/vendor/inventory/manage?edit=${prod._id}`}
                            className="w-10 h-10 bg-outline-variant/20 text-outline rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
                            title="Restock"
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddToQuote(prod)}
                            className="w-10 h-10 bg-primary text-on-primary hover:bg-primary-container rounded-lg flex items-center justify-center transition-all active:scale-90 shadow-md cursor-pointer"
                            aria-label={`Add ${prod.name} to storefront cart`}
                          >
                            <span className="material-symbols-outlined">add_shopping_cart</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
