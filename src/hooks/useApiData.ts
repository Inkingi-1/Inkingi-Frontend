"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { productsApi, categoriesApi, vendorsApi } from "@/lib/api";
import { ApiCategory, ApiProduct, ApiVendor, PaginatedResult } from "@/lib/api/types";

export function useProducts(params?: Record<string, string | number | boolean>) {
  const [data, setData] = useState<PaginatedResult<ApiProduct> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const paramsKey = useMemo(() => JSON.stringify(params ?? {}), [params]);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const parsed = JSON.parse(paramsKey) as Record<string, string | number | boolean>;
      const result = await productsApi.list(
        Object.keys(parsed).length > 0 ? parsed : undefined
      );
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [paramsKey]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}

export function useFeaturedProducts(limit = 8) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi
      .featured(limit)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [limit]);

  return { products, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => setCategories([]));
  }, []);

  return categories;
}

export function useVendors(page = 1) {
  const [data, setData] = useState<PaginatedResult<ApiVendor> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorsApi
      .list(page, 20)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, loading };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    productsApi
      .get(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading };
}
