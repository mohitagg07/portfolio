"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import styles from "./EngineeringPractice.module.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EngineeringPractice() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const entered = useInView(sceneRef, { once: true, amount: 0.28 });
  const reduceMotion = useReducedMotion();
  const shouldAnimate = entered && !reduceMotion;

  return (
    <section className={styles.section} aria-labelledby="engineering-practice-title">
      <header className={styles.intro}>
        <p className={styles.kicker}>02 <span>/</span> HOW I APPROACH A BUILD</p>
        <h3 id="engineering-practice-title">
          Make complexity <em>dependable.</em>
        </h3>
        <p className={styles.summary}>
          Built around context, resilience and human control.
        </p>
      </header>

      <div className={styles.visual} ref={sceneRef}>
        <svg
          className={styles.desktopSvg}
          viewBox="0 0 1080 320"
          role="img"
          aria-labelledby="engineering-visual-title engineering-visual-description"
        >
          <title id="engineering-visual-title">One connected approach to dependable software</title>
          <desc id="engineering-visual-description">
            Documents, workflows and conversations enter one system. It keeps context traceable,
            recovers unfinished work and respects user permission before producing a dependable outcome.
          </desc>

          <rect x="1" y="1" width="1078" height="318" rx="10" fill="#f5f2e9" stroke="#ded8c9" />

          <text x="48" y="62" className={styles.svgMono}>MANY INPUTS</text>

          <g className={styles.inputIcon}>
            <path d="M51 96h14l7 7v19H51z M65 96v8h7 M56 111h11 M56 116h11" />
            <path d="M51 151h21 M51 157h15 M51 163h18" />
            <path d="M51 198h21v14H60l-6 5v-5h-3z" />
          </g>
          <text x="88" y="114" className={styles.svgInput}>Documents</text>
          <text x="88" y="163" className={styles.svgInput}>Live workflows</text>
          <text x="88" y="210" className={styles.svgInput}>Conversations</text>

          <path
            d="M207 112 C238 112 239 160 270 160 M207 160 H270 M207 208 C238 208 239 160 270 160"
            fill="none"
            stroke="#b9bcae"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="270" cy="160" r="4" fill="#b88b3e" />

          <path d="M270 160H866" fill="none" stroke="#c9cbbb" strokeWidth="2" strokeLinecap="round" />
          <motion.path
            d="M270 160H866"
            fill="none"
            stroke="#b88b3e"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1.55, delay: 0.18, ease: EASE }}
          />

          <g>
            <text x="382" y="66" textAnchor="middle" className={styles.svgStageNo}>01 / CONTEXT</text>
            <text x="382" y="91" textAnchor="middle" className={styles.svgStageTitle}>Keep context</text>
            <circle cx="382" cy="160" r="25" fill="#f5f2e9" stroke="#b9c5ad" strokeWidth="1.5" />
            <rect x="373" y="148" width="18" height="24" rx="2.5" fill="none" stroke="#315a40" strokeWidth="1.5" />
            <path d="M377 155h10 M377 160h10 M377 165h7" fill="none" stroke="#315a40" strokeWidth="1.35" strokeLinecap="round" />
            <text x="382" y="222" textAnchor="middle" className={styles.svgCaption}>Sources stay traceable</text>
          </g>

          <g>
            <text x="548" y="66" textAnchor="middle" className={styles.svgStageNo}>02 / RESILIENCE</text>
            <text x="548" y="91" textAnchor="middle" className={styles.svgStageTitle}>Recover safely</text>
            <circle cx="548" cy="160" r="25" fill="#f5f2e9" stroke="#b9c5ad" strokeWidth="1.5" />
            <path d="M558 154a11 11 0 0 0-19-5l-3 3 M536 148h-1v-7 M538 166a11 11 0 0 0 19 5l3-3 M560 172h1v7" fill="none" stroke="#315a40" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <text x="548" y="222" textAnchor="middle" className={styles.svgCaption}>Retry what did not finish</text>
          </g>

          <g>
            <text x="714" y="66" textAnchor="middle" className={styles.svgStageNo}>03 / PERMISSION</text>
            <text x="714" y="91" textAnchor="middle" className={styles.svgStageTitle}>Respect choice</text>
            <circle cx="714" cy="160" r="25" fill="#f5f2e9" stroke="#b9c5ad" strokeWidth="1.5" />
            <rect x="702" y="154" width="24" height="12" rx="6" fill="#e4e9dc" stroke="#315a40" strokeWidth="1.3" />
            <circle cx="708" cy="160" r="4" fill="#315a40" />
            <text x="714" y="222" textAnchor="middle" className={styles.svgCaption}>Save only with consent</text>
          </g>

          <motion.circle
            cx="270"
            cy="160"
            r="4.5"
            fill="#b88b3e"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { cx: [270, 382, 548, 714, 866], opacity: [0, 1, 1, 1, 0] } : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 2.1, delay: 0.35, times: [0, 0.22, 0.48, 0.74, 1], ease: "linear" }}
          />

          <path d="M866 160H890" fill="none" stroke="#b88b3e" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="890" y="112" width="148" height="96" rx="7" fill="#18372a" />
          <text x="908" y="139" className={styles.svgOutputMeta}>THE OUTCOME</text>
          <text x="908" y="166" className={styles.svgOutputTitle}>Ready to use.</text>
          <path d="M908 178h112" stroke="#6c846f" strokeWidth="1" />
          <text x="908" y="194" className={styles.svgOutputFoot}>grounded · recoverable</text>

          <text x="48" y="278" className={styles.svgFoot}>ONE SYSTEM. DIFFERENT INPUTS.</text>
          <text x="1038" y="278" textAnchor="end" className={styles.svgFoot}>BUILT FOR REAL USE</text>
        </svg>

        <div className={styles.mobileScene} aria-label="One connected approach: context, resilience and user control">
          <div className={styles.mobileInputs}>
            <span>INPUTS</span>
            <p>Documents <i>·</i> workflows <i>·</i> conversations</p>
          </div>

          <div className={styles.mobileStages}>
            <div className={styles.mobileStage}>
              <span className={styles.mobileNumber}>01</span>
              <div>
                <strong>Keep context</strong>
                <p>Sources stay traceable.</p>
              </div>
            </div>
            <div className={styles.mobileStage}>
              <span className={styles.mobileNumber}>02</span>
              <div>
                <strong>Recover safely</strong>
                <p>Retry what did not finish.</p>
              </div>
            </div>
            <div className={styles.mobileStage}>
              <span className={styles.mobileNumber}>03</span>
              <div>
                <strong>Respect choice</strong>
                <p>Save only with consent.</p>
              </div>
            </div>
          </div>

          <div className={styles.mobileOutcome}>
            <span>THE OUTCOME</span>
            <strong>Ready to use.</strong>
            <small>Grounded · recoverable · user-controlled</small>
          </div>
        </div>
      </div>
    </section>
  );
}
