import Image from "next/image";

const PROJECTS = [
  {
    title: "VYRN",
    image: "/projects/vyrn.png",
    demo: "",
  },
  {
    title: "MindCare",
    image: "/projects/project-2.png",
    demo: "https://mindcare-yb5c.vercel.app/",
  },
  {
    title: "LegalMind",
    image: "/projects/project-3.png",
    demo: "https://legal-doc-demystifier.vercel.app/",
  },
  {
    title: "Innovix Studio",
    image: "/projects/project-1.png",
    demo: "https://innovix-branding-studio.vercel.app/",
  },
];

export default function Projects() {
  return (
    <section id="work" className="section-spacer">
      <div className="section-wrap">
        <h2 className="text-[clamp(36px,6vw,64px)] font-bold">things i&apos;ve made</h2>

        <div className="mt-12 columns-1 gap-8 md:columns-2">
          {PROJECTS.map((p) => {
            const body = (
              <>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  <Image
                    src={p.image}
                    alt={`${p.title} preview`}
                    width={1200}
                    height={800}
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
              </>
            );
            const cls = "group mb-8 block break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";
            return p.demo ? (
              <a key={p.title} href={p.demo} target="_blank" rel="noreferrer" className={cls}>{body}</a>
            ) : (
              <div key={p.title} className={cls}>{body}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
