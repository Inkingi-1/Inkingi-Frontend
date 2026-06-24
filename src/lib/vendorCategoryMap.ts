import { ApiCategory } from "@/lib/api/types";

/** UI labels on inventory form → API category names from seed */
const CATEGORY_LABEL_TO_API: Record<string, string[]> = {
  "Steel & Rebar": ["Steel & Rebar", "steel"],
  "Cement & Aggregates": ["Cement & Concrete", "cement"],
  "Plumbing Systems": ["Plumbing", "plumb"],
  "Electrical Components": ["Electrical", "electric"],
  "Finishing & Paints": ["Paint & Finishes", "paint", "finish"],
  Roofing: ["Roofing", "roof"],
  "Tools & Hardware": ["Tools & Hardware", "tool"],
};

export const INVENTORY_CATEGORY_LABELS = Object.keys(CATEGORY_LABEL_TO_API);

export function resolveCategoryId(label: string, categories: ApiCategory[]): string {
  const hints = CATEGORY_LABEL_TO_API[label] ?? [label];
  const found = categories.find((c) =>
    hints.some((h) => c.name.toLowerCase().includes(h.toLowerCase()) || c.slug.includes(h.toLowerCase()))
  );
  if (found) return found._id;
  return categories[0]?._id ?? "";
}

export function categoryLabelFromApi(category: ApiCategory | string | undefined): string {
  if (!category || typeof category === "string") return "Materials";
  const name = category.name;
  for (const [label, hints] of Object.entries(CATEGORY_LABEL_TO_API)) {
    if (hints.some((h) => name.toLowerCase().includes(h.toLowerCase()))) return label;
  }
  return name;
}

export function stockStatusFromQty(stock: number): {
  label: "In Stock" | "Low Stock" | "Out of Stock";
  color: string;
} {
  if (stock <= 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
  if (stock < 10) return { label: "Low Stock", color: "bg-amber-100 text-amber-800" };
  return { label: "In Stock", color: "bg-emerald-100 text-emerald-800" };
}
