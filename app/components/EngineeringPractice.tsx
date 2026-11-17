"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Dot, ShieldCheck, RotateCcw, BrainCircuit, Database, Workflow } from "lucide-react";
import styles from "./EngineeringPractice.module.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EngineeringPractice() {
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 13 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.62, delay, ease: EASE },
  });

  return (
    <section className={styles.section} aria-labelledby="engineering-practice-title">
      <div className={styles.composition}>
        <div className={styles.story}>
          <motion.p className={styles.kicker} {...reveal(0)}>
            02 <span>/</span> HOW I WORK
          </motion.p>

          <motion.h3 id="engineering-practice-title" {...reveal(0.06)}>
            What <em>holds it up.</em>
          </motion.h3>

          <motion.div className={styles.rule} {...reveal(0.12)} />

          <motion.p className={styles.introCopy} {...reveal(0.16)}>
            Three engineering decisions, opened up. Explore the guardrails, recovery paths and user
            controls that make the work dependable beyond a polished demo.
          </motion.p>

          <motion.div className={styles.principle} {...reveal(0.22)}>
            <span className={styles.principleLabel}>THE PRINCIPLE</span>
            <p>Build for the moment <em>something goes wrong.</em></p>
            <small>UNDERSTAND · BUILD · IMPROVE</small>
          </motion.div>
        </div>

        <motion.div className={styles.cutaway} {...reveal(0.1)}>
          <div className={styles.cutawayHead}><span>SECTION A–A</span><span>THREE SYSTEM DECISIONS</span></div>
          <div className={styles.cutawayRows}>
            <article className={styles.cutRow}>
              <header><span>01</span><strong>Guard</strong><small>LEGALMIND AI</small></header>
              <div className={styles.cutPlane}>
                <div className={styles.cutSurface}><small>PLAIN-LANGUAGE EXPLANATION</small><p>Understand a clause before deciding what to do next.</p><span>Explains. Doesn’t advise.</span></div>
                <div className={styles.cutSection}><div className={styles.cutNodes}>
                  <span><b>CLAUSE</b><small>INPUT</small></span><span><Database size={19}/><small>RETRIEVAL</small></span><span><ShieldCheck size={20}/><small>GUARDRAIL</small></span><span><Check size={18}/><small>OUTPUT</small></span>
                </div><p>Keep explanations grounded and neutral.</p></div>
              </div>
            </article>
            <article className={styles.cutRow}>
              <header><span>02</span><strong>Recover</strong><small>BUSINESS ENRICHMENT</small></header>
              <div className={styles.cutPlane}>
                <div className={styles.cutSurface}><small>VALIDATED BUSINESS RECORD</small><p>One clean record, ready for the next step.</p><span>Completed work stays intact.</span></div>
                <div className={styles.cutSection}><div className={styles.cutNodes}>
                  <span><b>01</b><small>DEDUPLICATE</small></span><span><Check size={19}/><small>VALIDATE</small></span><span><RotateCcw size={19}/><small>RETRY</small></span><span><Workflow size={18}/><small>RESUME</small></span>
                </div><p>Timeouts should trigger recovery, not lost progress.</p></div>
              </div>
            </article>
            <article className={styles.cutRow}>
              <header><span>03</span><strong>Consent</strong><small>MINDCARE</small></header>
              <div className={styles.cutPlane}>
                <div className={styles.cutSurface}><small>MEMORY IS USER-CONTROLLED</small>
                  <p className={styles.memoryReply} aria-live="polite">{memoryEnabled ? "Saved context can help continue a conversation." : "Memory is off. No saved context is used."}</p>
                  <button type="button" role="switch" aria-checked={memoryEnabled} className={styles.memorySwitch} onClick={() => setMemoryEnabled(v => !v)}>
                    <span aria-hidden="true"><i /></span>Memory {memoryEnabled ? "on" : "off"}
                  </button>
                </div>
                <div className={styles.cutSection}><div className={styles.cutNodes}>
                  <span><BrainCircuit size={19}/><small>CONTEXT</small></span><span><b>{memoryEnabled ? "ON" : "OFF"}</b><small>USER SWITCH</small></span><span><Database size={19}/><small>PROFILE</small></span><span><Check size={18}/><small>REPLY</small></span>
                </div><p>Illustrative control · user decides what is kept.</p></div>
              </div>
            </article>
          </div>
          <div className={styles.cutawayFoot}><span>ILLUSTRATIVE SYSTEM VIEWS</span><span>GUARDED · RECOVERABLE · USER-CONTROLLED</span></div>
        </motion.div>
      </div>

      <motion.div className={styles.craftStrip} {...reveal(0.18)}>
        <span className={styles.craftLabel}>THE CRAFT</span>
        {["Understand", "Design", "Build", "Validate", "Ship", "Improve"].map((item) => (
          <span className={styles.craftItem} key={item}>
            <Dot size={15} strokeWidth={3} />
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
