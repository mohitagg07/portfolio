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

export default function Story() {
  return (
    <section id="about" className="section-spacer">
      <div className="section-wrap grid gap-16 md:grid-cols-[1.2fr_1fr]">
        <div className="max-w-xl">
          <h2 className="text-[clamp(32px,5vw,52px)] font-bold">I like making confusing things feel easy.</h2>
          <div className="mt-6 space-y-4 leading-8 text-[var(--fg-muted)]">
            <p>I live in Jammu and studied computer science in Chennai. Every project I pick has the same shape: something genuinely useful, buried under too much complexity.</p>
            <p>At work, I build tools that handle the boring parts for clients, like collecting information from websites, connecting apps, and answering routine questions automatically.</p>
            <p>On the side, I make my own: a companion for heavy days, a reader that explains contracts like a friend would, and a coach that learns how you train. I make videos about it on YouTube too.</p>
          </div>
        </div>

        <ol className="space-y-6 border-l border-white/10 pl-6">
          {PATH.map(([when, where, what]) => (
            <li key={where}>
              <p className="text-sm text-[var(--accent)]">{when}</p>
              <p className="font-semibold">{where}</p>
              <p className="text-sm text-[var(--fg-muted)]">{what}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="section-wrap mt-24">
        <h3 className="text-2xl font-bold">What I&apos;ve been getting good at lately</h3>
        <dl className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {LEARNING.map(([title, text]) => (
            <div key={title} className="border-t border-white/10 pt-4">
              <dt className="font-semibold">{title}</dt>
              <dd className="mt-1 text-sm leading-7 text-[var(--fg-muted)]">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
