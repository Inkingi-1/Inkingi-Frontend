"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth, mapApiRoleToPortal, getHomeRouteForRole } from "@/context/AuthContext";

export function PortalAuth({ requiredRole }: { requiredRole: "vendor" | "carrier" }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!user) return;
    const portal = mapApiRoleToPortal(user.role);
    if (user.role === "admin") {
      router.replace("/admin");
      return;
    }
    if (portal !== requiredRole) {
      router.replace(getHomeRouteForRole(user.role));
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router, pathname]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  const portal = mapApiRoleToPortal(user.role);
  if (user.role !== "admin" && portal !== requiredRole) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return null;
}
