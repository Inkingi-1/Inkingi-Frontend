"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useParams, useRouter } from "next/navigation";

interface ProductDetail {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  sku: string;
  rating: number;
  reviewsCount: number;
  stockText: string;
  supplierName: string;
  supplierRating: string;
  supplierSales: string;
  supplierLogo: string;
  images: string[];
  specs: { label: string; value: string }[];
  reviews: { author: string; avatar: string; rating: number; date: string; content: string }[];
  category: string;
  categoryLink: string;
}

const PRODUCTS_DATA: Record<string, ProductDetail> = {
  "cement-cimerwa": {
    id: "cement-cimerwa",
    title: "CIMERWA Surebuild Cement 32.5N (50kg)",
    price: 12500,
    originalPrice: 13800,
    discount: "-10% OFF",
    sku: "BC-CIM-50-325",
    rating: 4.8,
    reviewsCount: 128,
    stockText: "IN STOCK - 450+ Units Available",
    supplierName: "Kigali Construction Depot",
    supplierRating: "4.9",
    supplierSales: "4.9k",
    supplierLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYbnJN3Hm2-JzfAbd5Zu5KNMsJjax0ZZbSJhw-9ZJON0ujqMmpRahbJchZEaKpK9ZUJngJY-I2VQWnqWWP0yg9tL-NCeRapVBrMELxaAy2DI-yaugd1ybtzhsA0J2UFlCAEDIWhZ9Xy83IG8PqygCrKRcsJeJk1BtG3ld9217zshhrAAShLzRAg19I7QgL0IfEzWCxfZZcumsIwUid02LIh5PJY-N4AcUTX52gpKDCZYZy3CXT1ljp8ocLzETvViaticVDSmel4OU",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5cr081xVJcDYctESV1VwR5erapu89SFQ0zSmGVG0Po1k3n4NyencVoUYE_h8DKhMOBqdhwwoDFmFcE4xTY7Fkoj8LOOxqSTPQ0EwuvsBWXl0q3lAQQeBX3NEDvLpzw22ebIWZiGj_BHlcyp3XprVSQ7FzwFYqn63IZg0c8SukRd1mSM1NCA08UMt2JciJks8uWMg4SIW9aSCQ-oXQlGSpRxzZ0mwwJK31u-ETOIwBye31KXLLIOJWPhzVeSq2jszjUUUd9QXcjPY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1UlzoAoRGLNAulE2-YaULZxY1EiRHjnrqRfaVzuCkulQ1IY3gsyJ89OO9lTx5d3pyATymiwXYXWsw3YUZvOpvvjg3zKuHz-PJiWYSe_5Xr8xwK0Z7p7r4T2ZaYxnOredmNKyU-PE0AufbcvEgWt091_h8XU97pbutGq6RefxWJeSLZpnQ0pj2Jj9Ch_e8bRDBWSBmtsQmi4WW4UTwdtq8_Hvf-knDn20LNo7eGdJNBUF4bI54L_H3_fBEDAJ0ScSi-_DHdFPKORs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvQ7HNRHsrO8QdTzYkuyCZ7WyzjTEqbHA-oCGOR5djS7fSUhPIkekwnt4KlcdD09hujB7nJKL4C-1P3Zabnl3X1I5xba_ZSD6g3c1E_Z-FVcrCNW2YhiCyQI_urIXKQDyB9hxALyr9rXWLtLztYx5V3ZWYY5IaYVBk1viCMZC0RDAHO5zi6F1du9OcUSKkG-huVECvpGjte030s844kpzDIJtRjcxGDM7xJmIuf61eXlk-5db2hcJ-oJdE6S37LldTK2Job8LUWZI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEEXoAkCGca1BdvbSq61zwHos-0pE7KCGOlO5l7IcFRZTYrTa0EY7YVWDosRqb079fD2ImQafSfa4IXe1MrIcflmx5tdO1gNRuzFQSmzbHJes_TSKVHyeIs6_52266dE3nSTW1plA8p2GX3MhFmqxe3FqQ7KrHwmIo891clLNM4y-bpTbWShQcSLhkL-_qcjJMO7kHYL9vc69kmxDo3HrhQ9iLHZXxf3R5UE_SDSij0U1_WhQXfITI7-DsIfzE_Buq9K2ymjspZvQ"
    ],
    specs: [
      { label: "Grade", value: "32.5N" },
      { label: "Weight", value: "50kg" },
      { label: "Standard", value: "RS EAS 18-1" },
      { label: "Manufacturer", value: "CIMERWA PLC" },
      { label: "Setting Time", value: "> 75 Minutes" },
      { label: "Applications", value: "Plastering, Flooring, Masonry" }
    ],
    reviews: [
      {
        author: "Munyaneza Kevin",
        avatar: "MK",
        rating: 5,
        date: "2 days ago",
        content: "Delivery was faster than expected! The cement quality is top-notch. BuildConnect makes construction logistics so easy."
      },
      {
        author: "Solange M.",
        avatar: "SM",
        rating: 4,
        date: "1 week ago",
        content: "Good pricing and the vendor was responsive. Will definitely order for my next project."
      }
    ],
    category: "Cement",
    categoryLink: "/marketplace?category=cement"
  },
  "roofing-blue": {
    id: "roofing-blue",
    title: "IBR Blue Matte Iron Sheets (3m)",
    price: 31500,
    originalPrice: 35000,
    discount: "-10% OFF",
    sku: "BC-ROOF-IBR-BLU",
    rating: 4.6,
    reviewsCount: 42,
    stockText: "IN STOCK - Special orders ready",
    supplierName: "TopRoof Rwanda",
    supplierRating: "4.7",
    supplierSales: "1.2k",
    supplierLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-3zN43Zyln-2x_P2OvJsLOPxSJr41SOSj8Bqpip4hmJqKLbDyNgRdAYDWTWzhPSMec73hxa3yFuHdSr5NOtP3aOXJrdloKaukIkxhxV_0VOBDuEWhoj3cviMnMP1wjuwwbhcWzuvfsifJbvZ2aJzn3_-wxr9fwBhyOyuP-cNyAdeadDKJ2evIPJ96isN3_VPMNHFrDU5DYlZFa2BbnphbuZLG0ZeiasYrQ5Tux8NxDiNdirSJAJMBMSK2tBcdttEJw8bgenKpNf8",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9EpJ-ww7kvUBsuA6LJi_e0VI_A43V73m2cHU5BCqsty-JucCZZq0hJWcTOdIKMxi4LBPw_6rXVoFt6WKQZfo43t_IVji2e3QoDypRg2hFSQb07z-oGbfiTkaZoqb5lW-vM6n5omY2SagpDIxSdjatk3kEg1bqNALGLsiMvHTXzTg3yfai9KrFJ5x5bB7JdyqLe33AzlKcKVcnxi_Gb9neOmhE9S6Cna69Dpj0-GF4Ae_jyiCleBazxIk0JwuPbepqcAZswG_c_3c",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDj6ZSG2PpgoaP3axFvAHmeH3DnYNSS0mtENdtTGoQ25Nv8PXqR-xBJ1sHRBoejZWsEjV-n-wR2CfnR0aXTWfPpxnjHQxjtIMU2LQZt02gDPZ4cHNwyFwAlFZceIXjhqR22N12f1ZMj37XpLvIm2beREOqOQG08jDELsD-Ltkwerk1QLQSkIhvTbs0qGkPnc7x-4KkJVUcjjjozjXcEv2XSqg4XBm6W9TGofWb1_4JShsG0Lrhge3yL6YIofuiaVcKS0VBTLlW-T38"
    ],
    specs: [
      { label: "Material", value: "Galvanized Steel" },
      { label: "Thickness", value: "0.40 mm" },
      { label: "Profile", value: "IBR Corrugated" },
      { label: "Finish", value: "Matte Blue" },
      { label: "Length", value: "3 meters" }
    ],
    reviews: [
      {
        author: "Jean Claude N.",
        avatar: "JC",
        rating: 5,
        date: "3 days ago",
        content: "Excellent roofing sheets. Color matches the visual perfectly and finish is durable."
      }
    ],
    category: "Roofing",
    categoryLink: "/marketplace?category=roofing"
  }
};

const DEFAULT_PRODUCT = PRODUCTS_DATA["cement-cimerwa"];

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useApp();

  const id = params.id as string;
  const product = PRODUCTS_DATA[id] || {
    ...DEFAULT_PRODUCT,
    id: id,
    title: id ? id.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase()) : DEFAULT_PRODUCT.title
  };

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    if (product.images.length > 0) {
      setMainImage(product.images[0]);
      setActiveThumb(0);
    }
    setQuantity(1);
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        category: product.category,
        supplier: product.supplierName,
      });
    }
    router.push("/cart");
  };

  return (
    <div className="animate-in fade-in duration-300">
      <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg grid grid-cols-1 lg:grid-cols-12 gap-lg items-start mt-2">
        {/* Left: Image Gallery (7 columns) */}
        <section className="lg:col-span-7 flex flex-col gap-sm">
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm aspect-square relative border border-outline-variant/10">
            <img
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              id="main-product-image"
              src={mainImage}
              alt={product.title}
            />
            <div className="absolute top-4 left-4 bg-tertiary-container/90 text-on-tertiary-container px-3 py-1 rounded-full text-label-bold font-label-bold">
              PREMIUM QUALITY
            </div>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-xs overflow-x-auto pb-2 hide-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMainImage(img);
                  setActiveThumb(idx);
                }}
                className={`min-w-[80px] h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  activeThumb === idx
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-outline-variant/30 hover:border-primary"
                }`}
              >
                <img className="w-full h-full object-cover" src={img} alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        </section>

        {/* Right: Product Info (5 columns) */}
        <section className="lg:col-span-5 flex flex-col gap-md">
          <div>
            <nav className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md mb-2">
              <Link className="hover:text-primary transition-colors" href="/marketplace">
                Marketplace
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link className="hover:text-primary transition-colors" href={product.categoryLink}>
                {product.category}
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-medium">{product.title}</span>
            </nav>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-1 font-bold">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-tertiary">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined">star_half</span>
                <span className="ml-1 text-on-surface-variant font-body-sm text-body-sm">
                  ({product.reviewsCount} reviews)
                </span>
              </div>
              <div className="h-4 w-px bg-outline-variant"></div>
              <span className="text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded text-label-bold font-label-bold">
                SKU: {product.sku}
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-headline-lg text-headline-lg text-on-background font-bold">
                {product.price.toLocaleString()} RWF
              </span>
              <span className="text-on-surface-variant line-through font-body-md text-body-md">
                {product.originalPrice.toLocaleString()} RWF
              </span>
              <span className="text-error font-label-bold text-label-bold">{product.discount}</span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-emerald-700 font-label-bold text-label-bold">{product.stockText}</span>
            </div>

            {/* Action Section */}
            <div className="flex flex-col gap-gutter p-gutter bg-surface-container-low rounded-xl border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="font-label-bold text-label-bold text-primary">SELECT QUANTITY</span>
                <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden h-10">
                  <button
                    className="px-3 hover:bg-surface-variant transition-colors active:scale-90 text-lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    className="w-16 border-none text-center font-bold focus:ring-0 bg-transparent outline-none"
                    max="1000"
                    min="1"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                  <button
                    className="px-3 hover:bg-surface-variant transition-colors active:scale-90 text-lg"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full h-12 bg-primary text-on-primary font-headline-md text-headline-md rounded-lg shadow-sm hover:bg-primary/95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full h-12 bg-tertiary-container text-on-tertiary-container hover:bg-tertiary hover:text-white font-headline-md text-headline-md rounded-lg active:scale-[0.98] transition-all"
                >
                  Buy Now
                </button>
              </div>
              <div className="flex items-start gap-3 pt-2 text-on-surface">
                <span className="material-symbols-outlined text-tertiary">local_shipping</span>
                <div>
                  <p className="font-label-bold text-label-bold text-on-background">Ultra-Fast Delivery</p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant">
                    Estimated delivery in <span className="font-bold text-primary">2 hours</span> within Kigali City.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Summary Card */}
          <Link href="/vendor/store" className="bg-surface-container-highest dark:bg-inverse-surface p-gutter rounded-xl flex items-center justify-between group cursor-pointer border border-transparent hover:border-primary/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-container-lowest bg-surface-container">
                <img className="w-full h-full object-cover" src={product.supplierLogo} alt="Supplier Logo" />
              </div>
              <div>
                <p className="font-label-bold text-label-bold text-on-background text-sm">{product.supplierName}</p>
                <p className="text-body-sm text-body-sm text-on-surface-variant">
                  {product.supplierRating} Positive Feedback • {product.supplierSales} Sales
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </section>

        {/* Detailed Specifications */}
        <section className="lg:col-span-12 py-lg">
          <h2 className="font-headline-md text-headline-md text-primary mb-gutter border-b border-outline-variant pb-2">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {product.specs.map((spec, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-outline-variant/30">
                <span className="text-on-surface-variant font-label-md text-label-md">{spec.label}</span>
                <span className="font-bold text-on-background">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews & Ratings */}
        <section className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-lg py-lg bg-surface-container-low rounded-2xl p-lg border border-outline-variant/20">
          <div className="lg:col-span-1 flex flex-col items-center justify-center text-center">
            <p className="font-headline-xl text-headline-xl text-on-background text-5xl font-bold">{product.rating}</p>
            <div className="flex text-tertiary mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
            </div>
            <p className="text-on-surface-variant text-body-sm font-body-sm">Based on {product.reviewsCount} verified purchases</p>
          </div>
          <div className="lg:col-span-2 space-y-md">
            {product.reviews.map((rev, index) => (
              <div key={index} className="flex gap-gutter items-start">
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold">
                  {rev.avatar}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-label-bold text-label-bold text-sm">{rev.author}</p>
                    <span className="text-on-surface-variant text-[11px]">{rev.date}</span>
                  </div>
                  <div className="flex text-tertiary text-xs mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant text-body-md text-sm">{rev.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
