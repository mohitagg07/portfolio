"use client";

import { useEffect, useState } from "react";

export default function GitHubStats(): React.JSX.Element {
  const [liveCount, setLiveCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.total === "number") setLiveCount(data.total);
      })
      .catch(() => {});
  }, []);

  const stats = [
    { num: liveCount !== null ? `${liveCount}+` : "3+", label: "Live Projects" },
    { num: "95%", label: "AI Accuracy" },
    { num: "6+", label: "Features Shipped" },
  ];

  return (
    <>
      {stats.map((s) => (
        <div key={s.label} className="text-center lg:text-left pt-4">
          <div
            className="text-xl font-bold text-gradient"
            style={{ fontFamily: "Syne,sans-serif" }}
          >
            {s.num}
          </div>
          <div
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter,sans-serif" }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </>
  );
}
