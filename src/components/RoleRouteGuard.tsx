"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth, getHomeRouteForRole } from "@/context/AuthContext";
import { isPublicInfoPath } from "@/lib/publicRoutes";

/** Redirects logged-in users to their assigned portal (customers may use buyer routes). */
export function RoleRouteGuard({ allowed }: { allowed: "buyer" | "vendor" | "carrier" | "admin" }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user) return;
    if (isPublicInfoPath(pathname)) return;

    const home = getHomeRouteForRole(user.role);
    const portal =
      user.role === "admin"
        ? "admin"
        : user.role === "vendor"
          ? "vendor"
          : user.role === "delivery"
            ? "carrier"
            : "buyer";

    if (portal !== allowed) {
      router.replace(home);
    }
  }, [isAuthenticated, isLoading, user, allowed, router, pathname]);

  return null;
}
