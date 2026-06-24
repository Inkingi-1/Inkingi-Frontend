"use client";

import { useEffect } from "react";

/** Catches unhandled rejections so they don't silently kill the UI in dev. */
export default function ClientBootstrap() {
  useEffect(() => {
    const onRejection = (event: PromiseRejectionEvent) => {
      console.error("[unhandledrejection]", event.reason);
    };
    const onError = (event: ErrorEvent) => {
      console.error("[window.error]", event.error ?? event.message);
    };

    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("error", onError);
    return () => {
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  return null;
}
