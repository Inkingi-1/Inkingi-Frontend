"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { vendorsApi, productsApi, productImage, productPrice, vendorBannerImage } from "@/lib/api";
import { ApiProduct, ApiVendor } from "@/lib/api/types";

export default function StoreDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [store, setStore] = useState<ApiVendor | null>(null);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      vendorsApi.get(id).catch(() => null),
      productsApi.list({ vendor: id, limit: 12 }).catch(() => ({ data: [] as ApiProduct[], meta: {} as never })),
    ])
      .then(([vendor, productResult]) => {
        if (!vendor) {
          setNotFound(true);
          setStore(null);
        } else {
          setStore(vendor);
          setNotFound(false);
        }
        setProducts(productResult.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="text-center py-20 px-margin-mobile">
        <h2 className="font-headline-md text-primary mb-2">Store not found</h2>
        <Link href="/stores" className="text-tertiary hover:underline">
          Back to stores directory
        </Link>
      </div>
    );
  }

  const heroImage = vendorBannerImage(store);
  const faqs = [
    {
      q: "What are your delivery areas?",
      a: `We deliver across ${store.city} and surrounding districts. Contact us for bulk site deliveries.`,
    },
    {
      q: "Do you offer bulk pricing?",
      a: "Yes — large construction orders qualify for negotiated rates. Post a requirement or contact the store directly.",
    },
    {
      q: "Are materials quality guaranteed?",
      a: store.isVerified
        ? "This is a BuildConnect verified partner with quality-checked inventory."
        : "All products are sourced from trusted manufacturers with standard warranties.",
    },
  ];

  return (
    <div className="animate-in fade-in duration-300 w-full">
      <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md mb-6">
          <Link className="hover:text-primary transition-colors" href="/stores">
            Stores Directory
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-medium">{store.storeName}</span>
        </nav>

        {notFound && (
          <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-error">warning</span>
            <p className="text-body-sm">Store ID &quot;{id}&quot; was not found.</p>
          </div>
        )}

        <section
          className="mb-xl relative rounded-xl overflow-hidden min-h-[320px] flex flex-col justify-end p-8 md:p-10 text-white shadow-md"
          style={{ backgroundImage: `url('${heroImage}')`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/20 z-10" />
          <div className="relative z-20">
            <div className="flex flex-wrap gap-2 mb-4">
              {store.isVerified && (
                <span className="bg-white text-emerald-800 px-3 py-1 rounded-full text-label-md font-label-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Verified Partner
                </span>
              )}
              <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-label-md font-label-bold">
                {store.averageRating} ★ ({store.reviewCount} reviews)
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold mb-2">
              {store.storeName}
            </h1>
            <p className="text-white/90 max-w-2xl text-body-md">
              {store.businessDetails?.description ||
                `Trusted construction materials supplier in ${store.district}, ${store.city}.`}
            </p>
            <p className="mt-3 flex items-center gap-2 text-white/80 text-sm">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {store.address}, {store.district}, {store.city}
            </p>
          </div>
        </section>

        <section className="mb-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-primary">Store Products</h2>
            <Link
              href={`/marketplace?vendor=${store._id}`}
              className="text-tertiary font-label-bold text-xs uppercase tracking-wider hover:underline"
            >
              View all in marketplace
            </Link>
          </div>
          {products.length === 0 ? (
            <p className="text-on-surface-variant text-center py-12 bg-surface-container-low rounded-xl">
              No products listed yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((prod) => (
                <Link
                  key={prod._id}
                  href={`/marketplace/product/${prod._id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/10 hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="h-40 overflow-hidden bg-surface-container">
                    <img
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={productImage(prod)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary line-clamp-1">{prod.name}</h3>
                    <p className="font-bold text-on-surface mt-2">
                      {productPrice(prod).toLocaleString()} RWF
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20">
          <h2 className="font-headline-md text-primary mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-outline-variant/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex justify-between items-center p-4 text-left font-label-bold text-primary cursor-pointer hover:bg-surface-container"
                >
                  {faq.q}
                  <span className="material-symbols-outlined">
                    {openFAQIndex === i ? "expand_less" : "expand_more"}
                  </span>
                </button>
                {openFAQIndex === i && (
                  <div className="px-4 pb-4 text-on-surface-variant text-body-sm">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
