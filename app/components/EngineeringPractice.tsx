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
  placement: "left" | "below" | "right" | "above";
}> = [
  {
    id: "understand",
    number: "01",
    name: "Understand",
    eyebrow: "START WITH THE REAL PROBLEM",
    headline: "Find what is actually getting in the way.",
    description:
      "Look past the first request. Understand the people, the hand-offs and the constraints before deciding what to build.",
    position: { left: "20.65%", top: "25.4%" },
    placement: "left",
  },
  {
    id: "build",
    number: "02",
    name: "Build",
    eyebrow: "MAKE A USEFUL FIRST VERSION",
    headline: "Give the idea something real to become.",
    description:
      "Choose the simplest set of tools that solves the real problem. Connect the pieces, then make the experience feel clear.",
    position: { left: "31%", top: "62.7%" },
    placement: "below",
  },
  {
    id: "challenge",
    number: "03",
    name: "Challenge",
    eyebrow: "TEST THE UNCOMFORTABLE CASES",
    headline: "Find the part that will break.",
    description:
      "Try the strange inputs, interrupted tasks and missed hand-offs. The weak points are often where the most useful learning lives.",
    position: { left: "76.1%", top: "65.4%" },
    placement: "right",
  },
  {
    id: "refine",
    number: "04",
    name: "Refine",
    eyebrow: "CARRY THE LEARNING FORWARD",
    headline: "Make the next pass more considered.",
    description:
      "Keep what works. Remove the friction. Strengthen what did not hold up — then take that understanding into the next cycle.",
    position: { left: "84.8%", top: "25%" },
    placement: "above",
  },
];

const ROUTE_PATH =
  "M 460 235 C 410 130 285 78 190 132 C 75 195 140 330 285 326 C 380 323 415 248 460 235 C 505 222 560 335 700 340 C 830 345 865 190 780 130 C 700 65 560 135 460 235";

const CONTOURS = [
  "M-50 96 C80 12 202 5 306 52 S500 130 632 75 S826 -4 970 50",
  "M-50 122 C80 39 205 35 309 78 S502 151 636 101 S828 23 970 77",
  "M-50 149 C84 68 208 62 315 104 S505 178 642 128 S832 50 970 104",
  "M-40 386 C84 326 187 352 280 393 S473 460 604 411 S821 320 965 365",
  "M-40 414 C80 354 190 382 286 420 S477 488 610 440 S825 350 965 393",
  "M-40 441 C83 384 194 409 292 447 S479 514 615 468 S830 380 965 421",
  "M35 250 C60 200 98 188 132 190 M34 270 C55 310 96 332 140 333",
  "M885 205 C852 166 826 154 795 156 M890 227 C865 270 827 289 786 287",
];

export default function EngineeringPractice() {
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, amount: 0.18 });
  const reduceMotion = useReducedMotion();
  const [activePhase, setActivePhase] = useState<Phase>("understand");
  const [replayKey, setReplayKey] = useState(0);
  const active = PHASES.find((phase) => phase.id === activePhase) ?? PHASES[0];

  return (
    <section className={styles.section} aria-labelledby="engineering-practice-title">
      <header className={styles.intro}>
        <p className={styles.kicker}>02 <span>/</span> HOW I APPROACH A BUILD</p>
        <div className={styles.headingRow}>
          <h3 id="engineering-practice-title">
            The work moves in <em>loops, not lines.</em>
          </h3>
          <p className={styles.summary}>
            Understand the problem. Make a pass. Learn from what happens. Come back sharper.
          </p>
        </div>
      </header>

      <div className={styles.fieldStudy}>
        <div className={styles.mapWrap} ref={mapRef}>
          <div className={styles.mapTopline}>
            <span>FIELD STUDY <b>—</b> 01</span>
            <span>A ROUTE THROUGH COMPLEXITY <i /></span>
          </div>

          <div className={styles.mapStage}>
            <svg
              className={styles.mapSvg}
              viewBox="0 0 920 470"
              role="img"
              aria-labelledby="field-map-title field-map-description"
            >
              <title id="field-map-title">A hand-drawn route through an iterative way of working</title>
              <desc id="field-map-description">
                A continuous, looping route moves through understanding, building, challenging
                and refining, then returns to the beginning. Contour lines suggest the complexity
                surrounding the work.
              </desc>

              <g className={styles.contours} fill="none">
                {CONTOURS.map((path, index) => (
                  <path key={index} d={path} />
                ))}
              </g>

              <g className={styles.mapCoordinates}>
                <text x="40" y="42">N 32° 43′</text>
                <text x="880" y="42" textAnchor="end">FIELD NOTES / ITERATION</text>
                <text x="40" y="448">PROBLEM SPACE</text>
                <text x="880" y="448" textAnchor="end">RETURN TO START ↶</text>
              </g>

              <path d={ROUTE_PATH} className={styles.routeUnderlay} />
              <path d={ROUTE_PATH} className={styles.routeMain} />
              <path d={ROUTE_PATH} className={styles.routeCenterline} />
              <path d={ROUTE_PATH} className={styles.routeDashes} />

              <path d="M430 202 C443 215 451 225 460 235" className={styles.crossingThread} />
              <path d="M460 235 C472 245 486 258 500 276" className={styles.crossingThread} />

              {PHASES.map((phase) => {
                const coords = {
                  understand: [190, 132],
                  build: [285, 326],
                  challenge: [700, 340],
                  refine: [780, 130],
                }[phase.id];

                return (
                  <g key={phase.id}>
                    <circle
                      cx={coords[0]}
                      cy={coords[1]}
                      r={activePhase === phase.id ? 15 : 10}
                      className={styles.routeNodeHalo}
                      data-active={activePhase === phase.id}
                    />
                    <circle
                      cx={coords[0]}
                      cy={coords[1]}
                      r={activePhase === phase.id ? 4.5 : 3}
                      className={styles.routeNode}
                      data-active={activePhase === phase.id}
                    />
                  </g>
                );
              })}

              <text x="460" y="211" textAnchor="middle" className={styles.mapCenterLabel}>
                THE PROCESS
              </text>
              <text x="460" y="239" textAnchor="middle" className={styles.mapCenterTitle}>
                Stay curious.
              </text>
              <text x="460" y="258" textAnchor="middle" className={styles.mapCenterSub}>
                KEEP MOVING. KEEP LEARNING.
              </text>

              {inView && !reduceMotion && (
                <g key={replayKey} className={styles.routeTraveller}>
                  <circle r="8" className={styles.travellerGlow}>
                    <animateMotion
                      dur="17s"
                      repeatCount="indefinite"
                      path={ROUTE_PATH}
                    />
                  </circle>
                  <circle r="3.2" className={styles.travellerCore}>
                    <animateMotion
                      dur="17s"
                      repeatCount="indefinite"
                      path={ROUTE_PATH}
                    />
                  </circle>
                </g>
              )}
            </svg>

            {PHASES.map((phase) => (
              <button
                key={phase.id}
                type="button"
                className={styles.mapPin}
                data-active={activePhase === phase.id}
                data-placement={phase.placement}
                style={phase.position}
                aria-pressed={activePhase === phase.id}
                onClick={() => setActivePhase(phase.id)}
                onMouseEnter={() => setActivePhase(phase.id)}
                onFocus={() => setActivePhase(phase.id)}
              >
                <span className={styles.pinDot} aria-hidden="true" />
                <span className={styles.pinLabel}>
                  <small>{phase.number}</small>
                  <strong>{phase.name}</strong>
                </span>
              </button>
            ))}
          </div>

          <div className={styles.mapBottomline}>
            <span>NO FIXED ROUTE. JUST BETTER QUESTIONS.</span>
            <span>THE NEXT PASS STARTS HERE <b>↗</b></span>
          </div>
        </div>

        <aside className={styles.fieldNote} aria-label="Selected stage">
          <div className={styles.noteTopline}>
            <span>IN THE MARGIN</span>
            <span>{active.number} <i>/ 04</i></span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePhase}
              className={styles.noteContent}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
            >
              <span className={styles.noteEyebrow}>{active.eyebrow}</span>
              <h4>{active.headline}</h4>
              <p>{active.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className={styles.noteFooter}>
            <button
              type="button"
              className={styles.replay}
              onClick={() => setReplayKey((value) => value + 1)}
              disabled={Boolean(reduceMotion)}
            >
              <RotateCcw size={13} strokeWidth={1.7} />
              <span>Follow the route again</span>
            </button>
            <span className={styles.routeIndex}>01—04—01</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
