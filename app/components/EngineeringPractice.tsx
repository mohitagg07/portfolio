"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeftRight, Check, Circle, Dot } from "lucide-react";
import styles from "./EngineeringPractice.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function EngineeringPractice() {
  const [unified, setUnified] = useState(false);
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
            Make the complicated <em>feel clear.</em>
          </motion.h3>

          <motion.div className={styles.rule} {...reveal(0.12)} />

          <motion.p className={styles.introCopy} {...reveal(0.16)}>
            I start by finding what is getting in the way. Then I build, test and refine until the
            system makes sense in real use.
          </motion.p>

          <motion.div className={styles.principle} {...reveal(0.22)}>
            <span className={styles.principleLabel}>THE PRINCIPLE</span>
            <p>Good work holds up <em>outside the demo.</em></p>
            <small>UNDERSTAND · BUILD · IMPROVE</small>
          </motion.div>
        </div>

        <motion.div
          className={styles.comparison}
          data-unified={unified ? "true" : "false"}
          {...reveal(0.1)}
        >
          <div className={styles.beforePanel} aria-hidden={unified}>
            <div className={styles.panelKicker}>01 <span>/</span> STARTING POINT</div>
            <h4>A lot to untangle.</h4>

            <div className={styles.rawBoard}>
              <svg className={styles.threads} viewBox="0 0 440 270" preserveAspectRatio="none" aria-hidden="true">
                <path d="M185 75 C230 75 230 120 263 120 S285 185 245 191" />
                <path d="M290 90 C270 118 238 135 200 169" />
                <path d="M92 132 C120 160 160 166 190 192" />
              </svg>

              <motion.article className={styles.requestCard} {...reveal(0.22)}>
                <span className={styles.cardLabel}>INCOMING REQUEST</span>
                <p>“Can we bring all this into one place?”</p>
                <i aria-hidden="true" />
              </motion.article>

              <motion.article className={styles.recordsCard} {...reveal(0.28)}>
                <span className={styles.cardLabel}>RAW RECORDS</span>
                <div><span>Acme / acme.io</span><i /></div>
                <div><span>ACME Inc / .com</span><i /></div>
                <div><span>Acme HQ / pending</span><i /></div>
              </motion.article>

              <motion.article className={styles.activityCard} {...reveal(0.34)}>
                <span className={styles.cardLabel}>AUTOMATION LOG</span>
                <p><i /> Step timed out</p>
                <p><i /> Needs a retry</p>
              </motion.article>

              <motion.article className={styles.followupCard} {...reveal(0.4)}>
                <span className={styles.cardLabel}>NOTES / FOLLOW-UP</span>
                <div className={styles.noteLines} />
                <em>Who owns the next step?</em>
              </motion.article>
            </div>
          </div>

          <div className={styles.afterPanel}>
            <div className={styles.panelKicker}>02 <span>/</span> WHAT IT BECOMES</div>
            <h4>One clear system.</h4>

            <motion.div
              className={styles.dashboard}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.25, ease: EASE }}
            >
              <div className={styles.dashboardHead}>
                <span><i /> WORKSPACE</span>
                <small>OPERATIONS / OVERVIEW</small>
              </div>

              <div className={styles.dashboardBody}>
                <h5>Operations overview</h5>
                <p className={styles.dashboardSub}>Everything important, in one place.</p>

                <div className={styles.metrics}>
                  <div><small>RECORDS</small><strong>Unified</strong></div>
                  <div><small>AUTOMATIONS</small><strong>Active</strong></div>
                  <div><small>NEXT ACTION</small><strong>Assigned</strong></div>
                </div>

                <div className={styles.queue}>
                  <div className={styles.queueTitle}>
                    <span>PRIORITY QUEUE</span>
                    <span>OWNER <b>STATUS</b></span>
                  </div>
                  <div className={styles.queueRow}>
                    <span>Supplier record</span>
                    <small>Research agent</small>
                    <strong className={styles.ready}>READY</strong>
                  </div>
                  <div className={styles.queueRow}>
                    <span>Follow-up sequence</span>
                    <small>Automation</small>
                    <strong className={styles.running}>RUNNING</strong>
                  </div>
                  <div className={styles.queueRow}>
                    <span>Review summary</span>
                    <small>You</small>
                    <strong className={styles.review}>REVIEW</strong>
                  </div>
                </div>

                <div className={styles.dashboardFoot}>
                  <Check size={11} strokeWidth={2.2} />
                  <span>One source of truth · clear next actions · recoverable work</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.button
            type="button"
            className={styles.transformButton}
            onClick={() => setUnified((value) => !value)}
            aria-label={unified ? "Show the original complexity" : "See the system brought together"}
            aria-pressed={unified}
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={unified ? "back" : "forward"}
                initial={reduceMotion ? false : { opacity: 0, rotate: -25, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, rotate: 25, scale: 0.7 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              >
                {unified ? <ArrowLeftRight size={19} /> : <ArrowLeftRight size={19} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
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
