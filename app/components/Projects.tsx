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
    <section ref={sectionRef} id="work" className={`section-spacer work-section ${active ? "is-active" : ""}`}>
      <div className="section-wrap">
        <div className="project-intro">
          <p className="project-eyebrow">Selected projects</p>
          <h2 className={`section-heading section-title ${active ? "is-in" : ""}`}>Software that makes everyday work easier</h2>
          <p className={`section-lede mt-5 ${seen ? "is-in" : ""}`}>
            Practical tools for repetitive workflows, scattered information, and tasks that are harder than they need to be.
          </p>
        </div>

        <div ref={ref} className={`project-grid mt-12 ${seen ? "is-in" : ""}`} role="region" aria-label="Selected projects. Scroll horizontally on small screens." tabIndex={0}>
          {PROJECTS.map((p, i) => {
            const body = (
              <>
                <div className="project-media">
                  <Image
                    src={p.image}
                    alt={`${p.title} preview`}
                    width={1200}
                    height={800}
                    sizes="(max-width: 680px) 88vw, (max-width: 1200px) 46vw, 520px"
                    className="project-image"
                  />
                </div>
                <div className="project-body">
                  <p className="project-kind">{p.kind}</p>
                  <h3 className="project-title">
                    {p.title}
                    {p.demo ? <span aria-hidden="true" className="project-arrow">↗</span> : null}
                  </h3>
                  <p className="project-problem"><span className="project-label">Problem</span>{p.problem}</p>
                  <p className="project-what"><span className="project-label">What I built</span>{p.what}</p>
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
            const cls = "project-card";
            const style = {
              "--i": i,
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
