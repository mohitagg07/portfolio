"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  FileText,
  GitBranch,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import styles from "./EngineeringPractice.module.css";

type Lens = "context" | "recovery" | "control";

const LENSES: Array<{
  id: Lens;
  number: string;
  name: string;
  short: string;
  headline: string;
  description: string;
  core: string;
  readout: string;
  icon: typeof FileText;
}> = [
  {
    id: "context",
    number: "01",
    name: "Context",
    short: "TRACE / LINKED",
    headline: "Nothing gets lost.",
    description:
      "Sources, decisions and the reason behind an output stay connected — so the next step starts informed, not from zero.",
    core: "TRACE",
    readout: "SOURCE GRAPH · CONNECTED",
    icon: FileText,
  },
  {
    id: "recovery",
    number: "02",
    name: "Resilience",
    short: "RECOVERY / READY",
    headline: "A failure is not the end.",
    description:
      "Work can retry from the point it stopped. Completed steps stay intact; the system picks up the pieces.",
    core: "RETRY",
    readout: "CHECKPOINT · RECOVERABLE",
    icon: GitBranch,
  },
  {
    id: "control",
    number: "03",
    name: "User control",
    short: "PERMISSION / ASK",
    headline: "The user stays in charge.",
    description:
      "Memory, persistence and consequential actions respect permission. Intelligence should never mean taking control away.",
    core: "CHOICE",
    readout: "PERMISSION · EXPLICIT",
    icon: ShieldCheck,
  },
];

const SPRING = { stiffness: 110, damping: 18, mass: 0.7 };

export default function EngineeringPractice() {
  const stageRef = useRef<HTMLDivElement>(null);
  const awake = useInView(stageRef, { once: true, amount: 0.22 });
  const reduceMotion = useReducedMotion();
  const [activeLens, setActiveLens] = useState<Lens>("context");
  const [run, setRun] = useState(0);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerX, SPRING);
  const rotateY = useSpring(pointerY, SPRING);

  const active = LENSES.find((lens) => lens.id === activeLens) ?? LENSES[0];

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(-y * 8);
    pointerY.set(x * 10);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className={styles.section} aria-labelledby="engineering-practice-title">
      <header className={styles.intro}>
        <p className={styles.kicker}>02 <span>/</span> HOW I APPROACH A BUILD</p>
        <h3 id="engineering-practice-title">
          Make complexity <em>feel effortless.</em>
        </h3>
        <p className={styles.summary}>
          A system is only as good as the experience it leaves behind.
        </p>
      </header>

      <div className={styles.experience}>
        <aside className={styles.controls} aria-label="Explore the engineering principles">
          <p className={styles.controlEyebrow}>CHOOSE A LENS <span>↘</span></p>

          <div className={styles.choices} role="group" aria-label="Choose an engineering principle">
            {LENSES.map((lens) => {
              const Icon = lens.icon;
              const selected = activeLens === lens.id;

              return (
                <button
                  key={lens.id}
                  type="button"
                  className={styles.choice}
                  data-active={selected}
                  aria-pressed={selected}
                  onClick={() => setActiveLens(lens.id)}
                >
                  <span className={styles.choiceIcon} aria-hidden="true">
                    <Icon size={16} strokeWidth={1.6} />
                  </span>
                  <span className={styles.choiceCopy}>
                    <small>{lens.number} / PRINCIPLE</small>
                    <strong>{lens.name}</strong>
                  </span>
                  <span className={styles.choiceArrow} aria-hidden="true">↗</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeLens}
              className={styles.detail}
              initial={reduceMotion ? false : { opacity: 0, y: 9, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -5, filter: "blur(3px)" }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
            >
              <span className={styles.detailIndex}>{active.number} / {active.short}</span>
              <h4>{active.headline}</h4>
              <p>{active.description}</p>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            className={styles.replay}
            onClick={() => setRun((value) => value + 1)}
          >
            <RotateCcw size={13} strokeWidth={1.7} />
            <span>Replay the sequence</span>
          </button>
        </aside>

        <div
          ref={stageRef}
          className={styles.stageShell}
          data-mode={activeLens}
          data-awake={awake ? "true" : "false"}
        >
          <div className={styles.stageChrome}>
            <span><i /> SYSTEM / IN MOTION</span>
            <span>INTERACTIVE STUDY <b>01</b></span>
          </div>

          <motion.div
            className={styles.stage}
            style={{ rotateX, rotateY }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            role="img"
            aria-label={`Three-dimensional system model highlighting ${active.name.toLowerCase()}`}
          >
            <div className={styles.stageAtmosphere} />
            <div className={styles.stageGrid} />
            <div className={styles.lightWell} />

            <div className={styles.orbit + " " + styles.orbitOne} />
            <div className={styles.orbit + " " + styles.orbitTwo} />
            <div className={styles.orbit + " " + styles.orbitThree} />

            <div className={styles.satellite + " " + styles.satelliteContext}>
              <span className={styles.satelliteIcon}><FileText size={15} strokeWidth={1.5} /></span>
              <span><strong>Context</strong><small>source memory</small></span>
            </div>

            <div className={styles.satellite + " " + styles.satelliteRecovery}>
              <span className={styles.satelliteIcon}><GitBranch size={15} strokeWidth={1.5} /></span>
              <span><strong>Recovery</strong><small>checkpoint logic</small></span>
            </div>

            <div className={styles.satellite + " " + styles.satelliteControl}>
              <span className={styles.satelliteIcon}><LockKeyhole size={15} strokeWidth={1.5} /></span>
              <span><strong>Permission</strong><small>human in control</small></span>
            </div>

            <div className={styles.coreAura} />
            <div className={styles.coreCube}>
              <div className={styles.coreFace + " " + styles.faceFront}>
                <span className={styles.corePulse} />
                <span className={styles.coreGlyph}>✳</span>
                <strong>{active.core}</strong>
                <small>ENGINE / 01</small>
              </div>
              <div className={styles.coreFace + " " + styles.faceBack}>
                <span className={styles.faceCode}>01</span>
              </div>
              <div className={styles.coreFace + " " + styles.faceRight}>
                <span className={styles.faceCode}>AI</span>
              </div>
              <div className={styles.coreFace + " " + styles.faceLeft}>
                <span className={styles.faceCode}>↗</span>
              </div>
              <div className={styles.coreFace + " " + styles.faceTop}>
                <span className={styles.faceCode}>✳</span>
              </div>
              <div className={styles.coreFace + " " + styles.faceBottom} />
            </div>

            <div className={styles.centerHalo} />
            {awake && (
              <motion.span
                key={run}
                className={styles.signalPulse}
                initial={{ opacity: 0, scale: 0.55 }}
                animate={{ opacity: [0, 0.72, 0], scale: [0.6, 1.35, 1.85] }}
                transition={{ duration: 2.2, ease: "easeOut" }}
              />
            )}
            <span className={styles.axisMark + " " + styles.axisTop}>X / 01</span>
            <span className={styles.axisMark + " " + styles.axisBottom}>Y / 02</span>
          </motion.div>

          <div className={styles.stageReadout}>
            <span className={styles.readoutLive}><i /> LIVE MODEL</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeLens}
                className={styles.readoutValue}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
              >
                {active.readout}
              </motion.span>
            </AnimatePresence>
            <span className={styles.tiltHint}>MOVE TO TILT <b>↗</b></span>
          </div>
        </div>
      </div>
    </section>
  );
}
