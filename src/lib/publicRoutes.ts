/** Buyer-area routes any logged-in role may view (legal, support). */
export const PUBLIC_INFO_PATHS = ["/help", "/contact", "/terms", "/privacy", "/cookies"] as const;

export function isPublicInfoPath(pathname: string): boolean {
  return PUBLIC_INFO_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
