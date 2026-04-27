"use client";

import { useEffect, useState } from "react";

export default function VisitorBadge(): React.JSX.Element {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Use localStorage for session tracking + fetch from countapi
    // countapi.xyz is free, no auth required
    const namespace = "mohit-portfolio";
    const key = "visitors";

    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.value) setCount(data.value);
      })
      .catch(() => {
        // Fallback — just show nothing
      });
  }, []);

  if (!count) return <></>;

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : String(count);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 9999,
        background: "rgba(108,99,255,0.08)",
        border: "1px solid rgba(108,99,255,0.18)",
        fontSize: 12,
        color: "rgba(255,255,255,0.55)",
        fontFamily: "Inter,sans-serif",
      }}
    >
      <svg style={{ width: 12, height: 12, fill: "none", stroke: "#a78bfa", strokeWidth: 2 }} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <span style={{ color: "#a78bfa", fontWeight: 600 }}>{formatted}</span>
      <span>page visits</span>
    </div>
  );
}
