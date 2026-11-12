"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import styles from "./EngineeringPractice.module.css";

type ProjectKey = "legal" | "pipeline" | "mindcare";

const PROJECTS: Array<{
  id: ProjectKey;
  number: string;
  name: string;
  insight: string;
}> = [
  {
    id: "legal",
    number: "01",
    name: "LegalMind AI",
    insight: "An answer should show where it came from.",
  },
  {
    id: "pipeline",
    number: "02",
    name: "Business pipeline",
    insight: "A timeout shouldn't waste the work already done.",
  },
  {
    id: "mindcare",
    number: "03",
    name: "MindCare",
    insight: "Memory should be chosen, never assumed.",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EngineeringPractice() {
  const [active, setActive] = useState<ProjectKey>("legal");
  const [guardrailApplied, setGuardrailApplied] = useState(false);
  const [pipelineRetried, setPipelineRetried] = useState(false);
  const [memoryEnabled, setMemoryEnabled] = useState(false);
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeProject = PROJECTS.find((project) => project.id === active) ?? PROJECTS[0];

  const selectTab = (index: number) => {
    const next = PROJECTS[index];
    if (!next) return;
    setActive(next.id);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectTab((index + 1) % PROJECTS.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectTab((index - 1 + PROJECTS.length) % PROJECTS.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectTab(PROJECTS.length - 1);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="engineering-practice-title">
      <div className={styles.intro}>
        <p className={styles.kicker}>02 <span>/</span> THE DETAILS THAT MATTER</p>
        <h3 id="engineering-practice-title">
          The details are where <em>trust is built.</em>
        </h3>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={active}
            className={styles.insight}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: EASE }}
          >
            {activeProject.insight}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className={styles.experience}>
        <div className={styles.tabs} role="tablist" aria-label="Try an engineering decision">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              id={`engineering-tab-${project.id}`}
              type="button"
              role="tab"
              aria-selected={active === project.id}
              aria-controls="engineering-panel"
              tabIndex={active === project.id ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(project.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span className={styles.tabNumber}>{project.number}</span>
              <span className={styles.tabName}>{project.name}</span>
              <span className={styles.tabMarker} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div
          id="engineering-panel"
          className={styles.panel}
          role="tabpanel"
          aria-labelledby={`engineering-tab-${active}`}
          tabIndex={0}
        >
          <div className={styles.demoShell}>
            <div className={styles.demoHeader}>
              <span>{activeProject.name}</span>
              <span className={styles.demoMode}>INTERACTIVE EXAMPLE</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className={styles.demoStage}
                initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: EASE }}
              >
                {active === "legal" && (
                  <LegalDemo
                    applied={guardrailApplied}
                    onToggle={() => setGuardrailApplied((value) => !value)}
                    reduceMotion={Boolean(reduceMotion)}
                  />
                )}
                {active === "pipeline" && (
                  <PipelineDemo
                    retried={pipelineRetried}
                    onRetry={() => setPipelineRetried((value) => !value)}
                    reduceMotion={Boolean(reduceMotion)}
                  />
                )}
                {active === "mindcare" && (
                  <MindCareDemo
                    enabled={memoryEnabled}
                    onToggle={() => setMemoryEnabled((value) => !value)}
                    reduceMotion={Boolean(reduceMotion)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegalDemo({
  applied,
  onToggle,
  reduceMotion,
}: {
  applied: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  const response = applied
    ? "Plain-English note: This clause leaves liability uncapped for indirect losses. Commercial agreements often negotiate a mutual cap tied to contract value."
    : "You must reject this contract immediately and refuse to sign Clause 14.2.";

  return (
    <div className={styles.legalDemo}>
      <div className={styles.sourceCard}>
        <div className={styles.cardOverline}>
          <span>SOURCE</span>
          <span>14.2</span>
        </div>
        <h4>Indemnity clause</h4>
        <p>
          Receiving Party shall indemnify Disclosing Party against all indirect or consequential losses
          <mark> without cap.</mark>
        </p>
        <span className={styles.sourceFoot}>Original wording stays attached</span>
      </div>

      <div className={styles.decisionRail} aria-hidden="true">
        <motion.span
          className={styles.railLine}
          animate={{ scaleY: applied ? 1 : 0.45, opacity: applied ? 1 : 0.55 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: EASE }}
        />
        <span className={styles.railNode}>{applied ? "✓" : "!"}</span>
        <span className={styles.railLabel}>SAFETY</span>
      </div>

      <div className={styles.responseCard} data-guarded={applied}>
        <div className={styles.cardOverline}>
          <span>{applied ? "GUARDED RESPONSE" : "MODEL DRAFT"}</span>
          <span className={applied ? styles.stateGood : styles.stateNeedsReview}>
            {applied ? "REVIEWED" : "NEEDS REVIEW"}
          </span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={applied ? "guarded" : "draft"}
            className={styles.responseText}
            initial={reduceMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: EASE }}
            aria-live="polite"
          >
            {response}
          </motion.p>
        </AnimatePresence>
        <span className={styles.responseSource}>
          {applied ? "↳ Source retained · Clause 14.2" : "↳ Source reference not yet attached"}
        </span>
      </div>

      <div className={styles.demoAction}>
        <span className={styles.actionNote}>
          {applied ? "Prescriptive wording intercepted." : "See what the safety layer changes."}
        </span>
        <button type="button" className={styles.actionButton} onClick={onToggle}>
          {applied ? "View original draft" : "Apply safety check"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}

function PipelineDemo({
  retried,
  onRetry,
  reduceMotion,
}: {
  retried: boolean;
  onRetry: () => void;
  reduceMotion: boolean;
}) {
  return (
    <div className={styles.pipelineDemo}>
      <div className={styles.pipelineTopline}>
        <span>ASYNC JOB</span>
        <span className={retried ? styles.stateGood : styles.stateNeedsReview}>
          {retried ? "COMPLETED" : "TIMED OUT"}
        </span>
      </div>

      <div className={styles.jobTrack}>
        <div className={styles.jobStep}>
          <span className={styles.jobIcon}>01</span>
          <span className={styles.jobLabel}>Collect</span>
          <span className={styles.jobStatus}>Done</span>
        </div>
        <motion.div
          className={styles.jobConnector}
          animate={{ backgroundColor: retried ? "#9eac8d" : "#c9c1af" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.3 }}
        />
        <div className={styles.jobStep}>
          <motion.span
            className={styles.jobIcon}
            data-retried={retried}
            animate={retried ? { rotate: 0, scale: 1 } : { rotate: 0, scale: 1 }}
          >
            {retried ? "✓" : "!"}
          </motion.span>
          <span className={styles.jobLabel}>Fetch</span>
          <span className={retried ? styles.stateGood : styles.stateNeedsReview}>
            {retried ? "Retried" : "Timeout"}
          </span>
        </div>
        <motion.div
          className={styles.jobConnector}
          animate={{ backgroundColor: retried ? "#9eac8d" : "#c9c1af", scaleX: retried ? 1 : 0.55 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: EASE }}
        />
        <div className={styles.jobStep}>
          <span className={styles.jobIcon}>03</span>
          <span className={styles.jobLabel}>Validate</span>
          <span className={styles.jobStatus}>{retried ? "Ready" : "Waiting"}</span>
        </div>
      </div>

      <div className={styles.mergeExample}>
        <div className={styles.mergeLabel}>DUPLICATE CHECK <span>ILLUSTRATIVE RECORDS</span></div>
        <div className={styles.mergeRows}>
          <motion.div
            className={styles.recordPair}
            animate={retried ? { x: 18, opacity: 0.42 } : { x: 0, opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: EASE }}
          >
            <span>northstar.example</span>
            <span>www.northstar.example</span>
          </motion.div>
          <motion.span
            className={styles.mergeArrow}
            animate={retried ? { scale: 1.08, opacity: 1 } : { scale: 1, opacity: 0.65 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.3 }}
            aria-hidden="true"
          >
            →
          </motion.span>
          <motion.div
            className={styles.canonicalRecord}
            animate={retried ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0.62, scale: 0.97, y: 3 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: EASE }}
          >
            <span className={styles.canonicalDot} />
            <span>{retried ? "One verified record" : "Canonical record"}</span>
          </motion.div>
        </div>
      </div>

      <div className={styles.demoAction}>
        <span className={styles.actionNote} aria-live="polite">
          {retried ? "The retry rejoins the completed run." : "Completed work stays untouched."}
        </span>
        <button type="button" className={styles.actionButton} onClick={onRetry}>
          {retried ? "Reset example" : "Retry failed job"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}

function MindCareDemo({
  enabled,
  onToggle,
  reduceMotion,
}: {
  enabled: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  return (
    <div className={styles.mindcareDemo}>
      <div className={styles.conversationCard}>
        <div className={styles.cardOverline}>
          <span>CONVERSATION</span>
          <span>THIS SESSION</span>
        </div>
        <div className={styles.chatLine}>
          <span className={styles.chatAvatar}>M</span>
          <p>Short check-ins work better for me.</p>
        </div>
        <div className={styles.conversationFoot}>A preference shared by the user</div>
      </div>

      <div className={styles.memoryDecision}>
        <span className={styles.memoryDecisionLabel}>REMEMBER THIS?</span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Save this conversation preference for next time"
          className={styles.memorySwitch}
          onClick={onToggle}
        >
          <span className={styles.switchTrack} data-enabled={enabled}>
            <span className={styles.switchThumb} />
          </span>
          <span>{enabled ? "On" : "Off"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={enabled ? "saved" : "not-saved"}
          className={styles.memoryResult}
          data-enabled={enabled}
          initial={reduceMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: EASE }}
          aria-live="polite"
        >
          <span className={styles.memoryResultIcon}>{enabled ? "✓" : "—"}</span>
          <div>
            <strong>{enabled ? "Saved context" : "Nothing saved"}</strong>
            <p>
              {enabled
                ? "Short check-ins work better for me."
                : "This preference stays in the current conversation only."}
            </p>
          </div>
          <span className={styles.memoryResultMeta}>{enabled ? "NEXT SESSION" : "SESSION ONLY"}</span>
        </motion.div>
      </AnimatePresence>

      <span className={styles.mindcareNote}>Preview only · No data is stored by this demo</span>
    </div>
  );
}
