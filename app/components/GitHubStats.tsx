"use client";

import { useEffect, useState } from "react";

// Known real project count (matches PROJECTS array in Projects.tsx).
// A live fetch is only ever allowed to raise this number, never lower it —
// a fetch failure, rate limit, or a repo missing its "homepage" field on
// GitHub should never be able to show fewer live projects than we know exist.
const KNOWN_LIVE_PROJECTS = 3;

export default function GitHubStats(): React.JSX.Element {
  const [liveCount, setLiveCount] = useState<number>(KNOWN_LIVE_PROJECTS);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.total === "number" && data.total > 0) {
          setLiveCount(Math.max(data.total, KNOWN_LIVE_PROJECTS));
        }
      })
      .catch(() => {});
  }, []);

  const stats = [
    { num: `${liveCount}+`, label: "Live Projects" },
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
