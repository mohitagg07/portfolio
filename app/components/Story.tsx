"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useInView } from "./useInView";

const PATH = [
  ["2025", "VIT Chennai", "Finished my computer science degree, focused on AI."],
  ["Internship", "Berger Paints", "Taught a computer to learn from real company data."],
  ["Now", "Relu Consultancy", "Building tools that take repetitive work off clients' plates."],
];

const LEARNING = [
  ["Assistants that make decisions", "Not just answering, but planning the steps and using tools to get things done."],
  ["Teaching AI your own documents", "So it answers from your files instead of guessing."],
  ["Connecting everyday apps", "When this happens here, do that over there. No one has to remember."],
  ["Apps for your phone", "My fitness coach, VYRN, lives there and adapts to how you train."],
];

const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Story() {
  const [sectionRef, active] = useInView<HTMLElement>(0.03);
  const [topRef, topIn] = useInView<HTMLDivElement>(0.2);
  const [learnRef, learnIn] = useInView<HTMLDivElement>(0.2);

  return (
    <section ref={sectionRef} id="about" className={`section-spacer ${active ? "is-active" : ""}`}>
      <div ref={topRef} className={`section-wrap grid gap-16 md:grid-cols-[1.2fr_1fr] ${topIn ? "is-in" : ""}`}>
        <div className="story-enter max-w-xl">
          <h2 className="section-title story-title" aria-label="I make complex things feel simple.">
            {"I make complex things feel simple.".split(" ").map((w, i, words) => (
              <Fragment key={`${i}-${w}`}>
                <span className="rise-word" style={idx(i)} aria-hidden="true"><span>{w}</span></span>
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>
          <div className="story-copy mt-6 space-y-4">
            <p>I live in Jammu and studied computer science in Chennai. Every project I pick has the same shape: something genuinely useful, buried under too much complexity.</p>
            <p>At work, I build tools that handle the boring parts for clients, like collecting information from websites, connecting apps, and answering routine questions automatically.</p>
            <p>On the side, I make my own: a companion for heavy days, a reader that explains contracts like a friend would, and a coach that learns how you train. I make videos about it on YouTube too.</p>
          </div>
        </div>

        <div className="story-enter story-enter--right space-y-10">
          <div className="story-photo mx-auto w-full max-w-[20rem]">
            <div className="story-photo__frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
              <Image
                src="/assets/mohit-story.jpg"
                alt="Mohit seated outdoors in a black suit"
                fill
                sizes="(max-width: 768px) 80vw, 352px"
                quality={75}
                className="story-portrait object-cover"
              />
              <span className="story-photo__label"><i /> Jammu, India</span>
            </div>
          </div>
          <ol className="vline space-y-8 pl-8">
            {PATH.map(([when, where, what], i) => (
              <li key={where} className="node relative" style={idx(i)}>
                <span className="absolute -left-[36px] top-2 h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
                <p className="text-sm text-[var(--accent)]">{when}</p>
                <p className="font-semibold">{where}</p>
                <p className="text-sm text-[var(--fg-muted)]">{what}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div ref={learnRef} className={`section-wrap mt-24 ${learnIn ? "is-in" : ""}`}>
        <h3 className="learn-heading text-2xl font-bold">What I&apos;ve been getting good at lately</h3>
        <dl className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {LEARNING.map(([title, text], i) => (
            <div key={title} className="hline pt-4" style={idx(i)}>
              <dt className="font-semibold">{title}</dt>
              <dd className="mt-1 text-sm leading-7 text-[var(--fg-muted)]">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
