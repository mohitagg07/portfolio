"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import styles from "./EngineeringPractice.module.css";

type Phase = "understand" | "build" | "challenge" | "refine";

const PHASES: Array<{
  id: Phase;
  number: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  position: { left: string; top: string };
  placement: string;
}> = [
  {
    id: "understand",
    number: "01",
    name: "Understand",
    eyebrow: "START WITH THE REAL PROBLEM",
    headline: "Find the friction first.",
    description:
      "Before choosing a tool, understand the people, hand-offs and constraints around the problem. Good engineering starts with asking better questions.",
    position: { left: "16.5%", top: "49.8%" },
    placement: "start",
  },
  {
    id: "build",
    number: "02",
    name: "Build",
    eyebrow: "MAKE SOMETHING USEFUL",
    headline: "Turn the idea into a working thing.",
    description:
      "Connect the right pieces, keep the system understandable, and make the useful path feel natural. Start focused; leave room to grow.",
    position: { left: "42.75%", top: "16.3%" },
    placement: "top",
  },
  {
    id: "challenge",
    number: "03",
    name: "Challenge",
    eyebrow: "TEST WHAT COULD GO WRONG",
    headline: "Look for the edge cases.",
    description:
      "Try interrupted runs, unexpected inputs and awkward hand-offs. Reliability comes from testing the parts that are easiest to overlook.",
    position: { left: "85.9%", top: "63%" },
    placement: "end",
  },
  {
    id: "refine",
    number: "04",
    name: "Refine",
    eyebrow: "LEARN AND RETURN",
    headline: "Keep what works. Improve the rest.",
    description:
      "Use what real use reveals. Remove friction, strengthen weak points, and carry those lessons into the next pass.",
    position: { left: "52.4%", top: "79.1%" },
    placement: "bottom",
  },
];

const LOOP_PATH =
  "M 132 214 C 132 137 220 63 342 70 C 453 77 488 42 590 74 C 716 113 758 203 687 271 C 616 340 521 374 419 340 C 327 309 237 369 160 310 C 93 259 132 291 132 214";

export default function EngineeringPractice() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [activePhase, setActivePhase] = useState<Phase>("understand");
  const [loopKey, setLoopKey] = useState(0);
  const active = PHASES.find((phase) => phase.id === activePhase) ?? PHASES[0];

  const replayLoop = () => setLoopKey((value) => value + 1);

  return (
    <section className={styles.section} aria-labelledby="engineering-practice-title">
      <header className={styles.intro}>
        <p className={styles.kicker}>02 <span>/</span> HOW I APPROACH A BUILD</p>
        <div className={styles.headingRow}>
          <h3 id="engineering-practice-title">
            Build. Learn. <em>Repeat.</em>
          </h3>
          <p className={styles.summary}>
            Good work rarely moves in a straight line. Every pass should make the next one better.
          </p>
        </div>
      </header>

      <div className={styles.workbench}>
        <div className={styles.loopCanvas} ref={sceneRef} data-running={inView && !reduceMotion}>
          <div className={styles.canvasHeader}>
            <span>THE WORKING LOOP</span>
            <span>01—04 <i /></span>
          </div>

          <div className={styles.loopStage}>
            <svg
              className={styles.loopSvg}
              viewBox="0 0 800 430"
              role="img"
              aria-labelledby="loop-title loop-description"
            >
              <title id="loop-title">A continuous engineering feedback loop</title>
              <desc id="loop-description">
                Understand the problem, build a useful solution, challenge it with real conditions,
                refine what you learn, and return to the problem with better understanding.
              </desc>

              <defs>
                <linearGradient id="loop-track-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#315e43" />
                  <stop offset="55%" stopColor="#879b72" />
                  <stop offset="100%" stopColor="#b88b3e" />
                </linearGradient>
                <filter id="loop-signal-glow" x="-300%" y="-300%" width="700%" height="700%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path d={LOOP_PATH} className={styles.loopTrackBase} />
              <path d={LOOP_PATH} className={styles.loopTrackAccent} />
              <path d={LOOP_PATH} className={styles.loopTrackDash} />

              <path
                d={LOOP_PATH}
                className={styles.loopInnerGuide}
              />

              {PHASES.map((phase) => {
                const coordinates = {
                  understand: [132, 214],
                  build: [342, 70],
                  challenge: [687, 271],
                  refine: [419, 340],
                }[phase.id];

                return (
                  <g key={phase.id}>
                    <circle
                      cx={coordinates[0]}
                      cy={coordinates[1]}
                      r={activePhase === phase.id ? 12 : 8}
                      className={styles.svgNodeHalo}
                      data-active={activePhase === phase.id}
                    />
                    <circle
                      cx={coordinates[0]}
                      cy={coordinates[1]}
                      r={activePhase === phase.id ? 4.5 : 3}
                      className={styles.svgNodeCore}
                      data-active={activePhase === phase.id}
                    />
                  </g>
                );
              })}

              <text x="407" y="196" textAnchor="middle" className={styles.loopCenterTop}>
                NOT A CHECKLIST
              </text>
              <text x="407" y="224" textAnchor="middle" className={styles.loopCenterMain}>
                A way of working.
              </text>
              <path d="M 374 240 H 440" className={styles.loopCenterRule} />
              <text x="407" y="258" textAnchor="middle" className={styles.loopCenterBottom}>
                EACH PASS MAKES THE NEXT ONE BETTER
              </text>

              {inView && !reduceMotion && (
                <g key={loopKey} filter="url(#loop-signal-glow)">
                  <circle r="4.4" className={styles.loopSignal}>
                    <animateMotion
                      dur="14s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path={LOOP_PATH}
                    />
                  </circle>
                  <circle r="1.4" fill="#fff8e8">
                    <animateMotion
                      dur="14s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path={LOOP_PATH}
                    />
                  </circle>
                </g>
              )}
            </svg>

            {PHASES.map((phase) => (
              <button
                key={phase.id}
                type="button"
                className={styles.phaseButton}
                data-active={activePhase === phase.id}
                data-placement={phase.placement}
                style={phase.position}
                aria-pressed={activePhase === phase.id}
                onClick={() => setActivePhase(phase.id)}
                onMouseEnter={() => setActivePhase(phase.id)}
                onFocus={() => setActivePhase(phase.id)}
              >
                <span className={styles.phasePin} aria-hidden="true" />
                <span className={styles.phaseText}>
                  <small>{phase.number}</small>
                  <strong>{phase.name}</strong>
                </span>
              </button>
            ))}
          </div>

          <div className={styles.canvasFooter}>
            <span>THE LOOP NEVER REALLY ENDS</span>
            <span>BACK TO THE BEGINNING <b>↶</b></span>
          </div>
        </div>

        <aside className={styles.phaseDetail} aria-label="Selected stage of the engineering loop">
          <div className={styles.detailTopline}>
            <span>THE APPROACH</span>
            <span>{active.number} <i>/ 04</i></span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePhase}
              className={styles.detailContent}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
            >
              <p className={styles.detailEyebrow}>{active.eyebrow}</p>
              <h4>{active.headline}</h4>
              <p className={styles.detailDescription}>{active.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className={styles.detailBottom}>
            <button type="button" className={styles.replayButton} onClick={replayLoop}>
              <RotateCcw size={13} strokeWidth={1.7} />
              <span>Watch it go around again</span>
            </button>
            <span className={styles.loopIndex}>01 — 04 — 01</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
