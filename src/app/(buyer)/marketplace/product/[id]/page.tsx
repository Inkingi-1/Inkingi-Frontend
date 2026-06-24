"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/hooks/useApiData";
import {
  categoryName,
  productImage,
  productPrice,
  vendorName,
} from "@/lib/api";
import { ApiVendor } from "@/lib/api/types";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { addToCart } = useApp();
  const { product, loading } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = async () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      await addToCart({
        id: product._id,
        productId: product._id,
        title: product.name,
        price: productPrice(product),
        image: productImage(product),
        category: categoryName(product.category as never),
        supplier: vendorName(product.vendor as never),
      });
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 px-margin-mobile">
        <h2 className="font-headline-md text-primary mb-2">Product not found</h2>
        <Link href="/marketplace" className="text-tertiary hover:underline">
          Back to marketplace
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [productImage(product)];
  const vendor = product.vendor as ApiVendor | undefined;
  const vendorId = typeof vendor === "object" ? vendor._id : undefined;
  const catSlug =
    typeof product.category === "object" ? product.category.slug : "all";
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  return (
    <div className="animate-in fade-in duration-300">
      <main className="py-8 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-5">
            <div className="bg-surface-container rounded-2xl overflow-hidden aspect-square mb-4 border border-outline-variant/20">
              <img
                alt={product.name}
                className="w-full h-full object-cover"
                src={images[activeImage]}
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                      activeImage === i ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img alt="" className="w-full h-full object-cover" src={img} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col gap-gutter">
            <nav className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md">
              <Link className="hover:text-primary transition-colors" href="/marketplace">
                Marketplace
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link className="hover:text-primary transition-colors" href={`/marketplace?category=${catSlug}`}>
                {categoryName(product.category as never)}
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-medium line-clamp-1">{product.name}</span>
            </nav>

            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="ml-1 text-on-surface-variant font-body-sm">
                  {product.averageRating || "—"} ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded text-label-bold font-label-bold">
                SKU: {product.sku}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-headline-lg text-headline-lg font-bold">
                {productPrice(product).toLocaleString()} RWF
              </span>
              {hasDiscount && (
                <>
                  <span className="text-on-surface-variant line-through">
                    {product.price.toLocaleString()} RWF
                  </span>
                  <span className="text-error font-label-bold">-{discountPct}% OFF</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  product.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-error"
                }`}
              />
              <span className={`font-label-bold ${product.stock > 0 ? "text-emerald-700" : "text-error"}`}>
                {product.stock > 0 ? `IN STOCK — ${product.stock} units` : "OUT OF STOCK"}
              </span>
            </div>

            <div className="flex flex-col gap-gutter p-gutter bg-surface-container-low rounded-xl border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="font-label-bold text-primary">SELECT QUANTITY</span>
                <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden h-10">
                  <button
                    type="button"
                    className="px-3 hover:bg-surface-variant transition-colors text-lg cursor-pointer"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    className="w-16 border-none text-center font-bold focus:ring-0 bg-transparent outline-none"
                    min={1}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                  <button
                    type="button"
                    className="px-3 hover:bg-surface-variant transition-colors text-lg cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="w-full h-12 bg-primary text-on-primary font-headline-md rounded-lg hover:bg-primary/95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="w-full h-12 bg-tertiary-container text-on-tertiary-container hover:bg-tertiary hover:text-white font-headline-md rounded-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {vendorId && (
              <Link
                href={`/stores/${vendorId}`}
                className="bg-surface-container-highest p-gutter rounded-xl flex items-center justify-between group cursor-pointer border border-transparent hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-container-lowest bg-surface-container">
                    {typeof vendor === "object" && vendor.logo ? (
                      <img className="w-full h-full object-cover" src={vendor.logo} alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary font-bold text-sm">
                        {vendorName(vendor).slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-label-bold text-sm">{vendorName(vendor)}</p>
                    <p className="text-body-sm text-on-surface-variant">
                      {typeof vendor === "object" ? `${vendor.averageRating} rating` : "Verified supplier"}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            )}
          </div>
        </section>

        {product.description && (
          <section className="lg:col-span-12 py-lg mt-8">
            <h2 className="font-headline-md text-primary mb-gutter border-b border-outline-variant pb-2">
              Description
            </h2>
            <p className="text-on-surface-variant leading-relaxed max-w-3xl">{product.description}</p>
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-surface-container rounded-full text-xs font-bold text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
