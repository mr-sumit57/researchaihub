"use client";

import { useEffect } from "react";

export function ToolViewTracker({ toolId }: { toolId: string }) {
  useEffect(() => {
    fetch("/api/tool-views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toolId,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
      }),
    }).catch(() => {});
  }, [toolId]);

  return null;
}
