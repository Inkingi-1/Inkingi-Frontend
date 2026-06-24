"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth, mapApiRoleToPortal } from "@/context/AuthContext";

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
    if (user && user.role !== "admin") {
      const portal = mapApiRoleToPortal(user.role);
      if (portal !== requiredRole) {
        router.replace("/");
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router, pathname]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return null;
}
