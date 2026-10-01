"use client";

import Image from "next/image";
import { useInView } from "./useInView";

const PROJECTS = [
  { title: "VYRN", image: "/projects/vyrn.png", demo: "" },
  { title: "MindCare", image: "/projects/project-2.png", demo: "https://mindcare-yb5c.vercel.app/" },
  { title: "LegalMind", image: "/projects/project-3.png", demo: "https://legal-doc-demystifier.vercel.app/" },
  { title: "Innovix Studio", image: "/projects/project-1.png", demo: "https://innovix-branding-studio.vercel.app/" },
];

const tilt = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  e.currentTarget.style.setProperty("--rx", `${-y * 8}deg`);
  e.currentTarget.style.setProperty("--ry", `${x * 10}deg`);
};
const untilt = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

export default function Projects() {
  const [ref, seen] = useInView<HTMLDivElement>(0.1);

  return (
    <section id="work" className={`section-spacer ${seen ? "is-active" : ""}`}>
      <div className="section-wrap">
        <h2 className={`section-heading ${seen ? "is-in" : ""} text-[clamp(36px,6vw,64px)] font-bold`}>things i&apos;ve made</h2>

        <div ref={ref} className={`mt-12 columns-1 gap-8 md:columns-2 ${seen ? "is-in" : ""}`}>
          {PROJECTS.map((p, i) => {
            const body = (
              <div className={`curtain overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] ${i % 2 ? "alt" : ""}`}>
                <Image src={p.image} alt={`${p.title} preview`} width={1200} height={800} className="h-auto w-full" />
              </div>
            );
            const cls = "tilt mb-8 block break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";
            const style = { "--i": i } as React.CSSProperties;
            return p.demo ? (
              <a key={p.title} href={p.demo} target="_blank" rel="noreferrer" className={cls} style={style} onMouseMove={tilt} onMouseLeave={untilt}>{body}</a>
            ) : (
              <div key={p.title} className={cls} style={style} onMouseMove={tilt} onMouseLeave={untilt}>{body}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
