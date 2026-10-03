"use client";

import Image from "next/image";
import { useInView } from "./useInView";

interface Project {
  title: string;
  kind: string;
  problem: string;
  what: string;
  image: string;
  demo: string;
  stack?: string[];
}

const PROJECTS: Project[] = [
  {
    title: "VYRN",
    kind: "Mobile app · AI fitness coach",
    problem: "A fixed workout plan can miss the difference between a high-readiness day and a recovery day.",
    what: "VYRN uses recovery, training-load, and nutrition inputs to recommend a training intensity and explain the choice.",
    image: "/projects/vyrn.png",
    demo: "",
    stack: ["React Native", "FastAPI", "Supabase", "LangGraph"],
  },
  {
    title: "MindCare",
    kind: "Web app · AI companion",
    problem: "It can be hard to put difficult days into words, and generic prompts do not always help.",
    what: "An AI companion for daily check-ins and reflection, with mood tracking over time.",
    image: "/projects/project-2.png",
    demo: "https://mindcare-yb5c.vercel.app/",
  },
  {
    title: "LegalMind",
    kind: "Web app · Document AI",
    problem: "Contracts and legal notices can be hard to understand without legal training.",
    what: "Upload a document for a plain-English summary and clauses to review. It is an aid to understanding, not legal advice.",
    image: "/projects/project-3.png",
    demo: "https://legal-doc-demystifier.vercel.app/",
  },
  {
    title: "Innovix Studio",
    kind: "Website · Creative agency",
    problem: "A new agency needs visitors to understand its services and know how to get in touch.",
    what: "A brand site for a creative agency in Jammu, with clear service information and an easy-to-find call booking action.",
    image: "/projects/project-1.png",
    demo: "https://innovix-branding-studio.vercel.app/",
  },
];

export default function Projects() {
  const [sectionRef, active] = useInView<HTMLElement>(0.03);
  const [ref, seen] = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={sectionRef} id="work" className={`section-spacer ${active ? "is-active" : ""}`}>
      <div className="section-wrap">
        <h2 className={`section-heading section-title ${seen ? "is-in" : ""}`}>Selected work</h2>
        <p className={`section-lede mt-5 ${seen ? "is-in" : ""}`}>
          Each one starts with a problem people already have. Here is the problem, and what I built for it.
        </p>

        <div ref={ref} className={`mt-12 grid items-start gap-x-8 gap-y-14 md:grid-cols-2 ${seen ? "is-in" : ""}`}>
          {PROJECTS.map((p, i) => {
            const body = (
              <>
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
                <div className="project-body">
                  <p className="project-kind">{p.kind}</p>
                  <h3 className="project-title">
                    {p.title}
                    {p.demo ? <span aria-hidden="true" className="project-arrow">↗</span> : null}
                  </h3>
                  <p className="project-problem">{p.problem}</p>
                  <p className="project-what">{p.what}</p>
                  {p.stack ? (
                    <ul className="project-stack" aria-label={`${p.title} built with`}>
                      {p.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </>
            );
            const cls = "project-card block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";
            const style = {
              "--i": i,
              "--enter-x": i % 2 === 0 ? "-28px" : "28px",
              "--enter-x-mobile": i % 2 === 0 ? "-34px" : "34px",
            } as React.CSSProperties;
            return p.demo ? (
              <a key={p.title} href={p.demo} target="_blank" rel="noopener noreferrer" className={cls} style={style} aria-label={`${p.title}: open live demo`}>{body}</a>
            ) : (
              <article key={p.title} className={cls} style={style}>{body}</article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
