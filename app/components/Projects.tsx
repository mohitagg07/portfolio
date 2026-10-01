"use client";

import Image from "next/image";
import { useInView, useVisibility } from "./useInView";

const PROJECTS = [
  { title: "VYRN", image: "/projects/vyrn.png", demo: "" },
  { title: "MindCare", image: "/projects/project-2.png", demo: "https://mindcare-yb5c.vercel.app/" },
  { title: "LegalMind", image: "/projects/project-3.png", demo: "https://legal-doc-demystifier.vercel.app/" },
  { title: "Innovix Studio", image: "/projects/project-1.png", demo: "https://innovix-branding-studio.vercel.app/" },
];

export default function Projects() {
  const [sectionRef, active] = useVisibility<HTMLElement>(0.03, "120px 0px");
  const [ref, seen] = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={sectionRef} id="work" className={`section-spacer ${active ? "is-active" : ""}`}>
      <div className="section-wrap">
        <h2 className={`section-heading section-title ${seen ? "is-in" : ""}`}>things i&apos;ve made</h2>

        <div ref={ref} className={`mt-12 columns-1 gap-8 md:columns-2 ${seen ? "is-in" : ""}`}>
          {PROJECTS.map((p, i) => {
            const body = (
              <div className={`curtain overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] ${i % 2 ? "alt" : ""}`}>
                <Image
                  src={p.image}
                  alt={`${p.title} preview`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 680px) 88vw, (max-width: 1200px) 46vw, 520px"
                  className="h-auto w-full"
                />
              </div>
            );
            const cls = "project-card mb-8 block break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";
            const style = { "--i": i } as React.CSSProperties;
            return p.demo ? (
              <a key={p.title} href={p.demo} target="_blank" rel="noreferrer" className={cls} style={style}>{body}</a>
            ) : (
              <div key={p.title} className={cls} style={style}>{body}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
