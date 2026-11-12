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
  discipline: string;
  insight: string;
}> = [
  {
    id: "legal",
    number: "01",
    name: "LegalMind AI",
    discipline: "DOCUMENT INTELLIGENCE",
    insight: "Keep source structure and references intact.",
  },
  {
    id: "pipeline",
    number: "02",
    name: "Business pipeline",
    discipline: "WORKFLOW ENGINEERING",
    insight: "Retry unfinished work. Leave completed work untouched.",
  },
  {
    id: "mindcare",
    number: "03",
    name: "MindCare",
    discipline: "CONVERSATIONAL AI",
    insight: "Saved context stays under the user's control.",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EngineeringPractice() {
  const [active, setActive] = useState<ProjectKey>("legal");
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
          What happens <em>underneath</em> matters.
        </h3>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className={styles.insight}
            initial={reduceMotion ? false : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: EASE }}
          >
            <span className={styles.projectMeta}>
              {activeProject.number} / {activeProject.discipline}
            </span>
            <p>{activeProject.insight}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.experience}>
        <div className={styles.tabs} role="tablist" aria-label="Explore engineering decisions">
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
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className={styles.scene}
              initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -5, scale: 0.995 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: EASE }}
            >
              {active === "legal" && <LegalScene reduceMotion={Boolean(reduceMotion)} />}
              {active === "pipeline" && <PipelineScene reduceMotion={Boolean(reduceMotion)} />}
              {active === "mindcare" && (
                <MindCareScene memoryEnabled={memoryEnabled} reduceMotion={Boolean(reduceMotion)} />
              )}
            </motion.div>
          </AnimatePresence>

          {active === "mindcare" && (
            <div className={styles.memoryControlRow}>
              <span className={styles.memoryHint}>Preview user-controlled memory</span>
              <button
                type="button"
                role="switch"
                aria-checked={memoryEnabled}
                aria-label="Save this conversation context"
                className={styles.memorySwitch}
                onClick={() => setMemoryEnabled((enabled) => !enabled)}
              >
                <span className={styles.switchTrack} data-enabled={memoryEnabled}>
                  <span className={styles.switchThumb} />
                </span>
                <span>{memoryEnabled ? "Memory on" : "Memory off"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function LegalScene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <>
      <svg className={styles.desktopSvg} viewBox="0 0 660 250" role="img" aria-label="A contract clause passes through a safety check and becomes a neutral explanation">
        <defs>
          <linearGradient id="legal-card" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fffdf7" />
            <stop offset="1" stopColor="#f5f0e4" />
          </linearGradient>
        </defs>

        <rect x="18" y="28" width="188" height="186" rx="7" fill="url(#legal-card)" stroke="#d8d0bd" />
        <text x="36" y="51" className={styles.svgMono}>SOURCE DOCUMENT</text>
        <text x="36" y="76" className={styles.svgSerif}>Service agreement</text>
        <path d="M36 91H185 M36 101H169 M36 111H180" stroke="#c9c3b5" strokeWidth="3" strokeLinecap="round" />
        <rect x="30" y="126" width="164" height="43" rx="4" fill="#e6ecd9" />
        <text x="42" y="143" className={styles.svgStrong}>14.2 / LIABILITY</text>
        <path d="M42 153H176 M42 160H151" stroke="#879b7b" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M36 184H179" stroke="#d5cfc1" strokeWidth="2.4" strokeLinecap="round" />

        <motion.path
          d="M207 147 C239 147 242 110 276 110 H310"
          fill="none"
          stroke="#b48b43"
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.85, delay: 0.12, ease: EASE }}
        />
        <motion.circle cx="310" cy="110" r="5" fill="#b48b43" initial={reduceMotion ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ delay: reduceMotion ? 0 : 0.7 }} />
        <circle cx="335" cy="110" r="28" fill="#e7ecdc" stroke="#c3cdb4" />
        <path d="M324 110L332 118L347 100" fill="none" stroke="#315a40" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
        <text x="335" y="157" textAnchor="middle" className={styles.svgMono}>SAFETY CHECK</text>

        <motion.path
          d="M364 110 C390 110 393 110 420 110"
          fill="none"
          stroke="#b48b43"
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.45, ease: EASE }}
        />
        <rect x="424" y="48" width="216" height="132" rx="7" fill="#18372a" />
        <text x="442" y="72" className={styles.svgMonoLight}>PLAIN-ENGLISH NOTE</text>
        <path d="M442 84H621" stroke="#6c846f" strokeWidth="1" />
        <text x="442" y="108" className={styles.svgLightStrong}>Liability is uncapped</text>
        <text x="442" y="128" className={styles.svgLight}>for indirect losses.</text>
        <text x="442" y="151" className={styles.svgLightMuted}>Source clause 14.2</text>
        <rect x="442" y="160" width="84" height="5" rx="2.5" fill="#c7d5a6" opacity=".82" />
        <text x="36" y="232" className={styles.svgMono}>CLAUSE ORDER PRESERVED</text>
        <text x="624" y="232" textAnchor="end" className={styles.svgMono}>GROUNDED RESPONSE</text>
      </svg>

      <div className={styles.mobileFlow} aria-hidden="true">
        <div><span className={styles.mobileNode}>01</span><strong>Source clause</strong><small>14.2 / Liability</small></div>
        <span className={styles.mobileConnector} />
        <div><span className={styles.mobileNode}>02</span><strong>Safety check</strong><small>Prescriptive wording intercepted</small></div>
        <span className={styles.mobileConnector} />
        <div><span className={styles.mobileNode}>03</span><strong>Grounded note</strong><small>Neutral explanation · source 14.2</small></div>
      </div>
    </>
  );
}

function PipelineScene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <>
      <svg className={styles.desktopSvg} viewBox="0 0 660 250" role="img" aria-label="Business records are validated, a failed job retries, and duplicate records resolve into one entity">
        <text x="22" y="25" className={styles.svgMono}>INCOMING RECORDS</text>
        <rect x="18" y="39" width="190" height="44" rx="6" fill="#fffdf7" stroke="#d8d0bd" />
        <text x="32" y="57" className={styles.svgStrong}>RECORD 01</text>
        <text x="32" y="72" className={styles.svgSmall}>website · phone</text>

        <rect x="18" y="93" width="190" height="44" rx="6" fill="#fffdf7" stroke="#d8d0bd" />
        <text x="32" y="111" className={styles.svgStrong}>RECORD 02</text>
        <text x="32" y="126" className={styles.svgSmall}>same business · variant URL</text>

        <rect x="18" y="147" width="190" height="44" rx="6" fill="#f6ead9" stroke="#d7bd91" strokeDasharray="4 4" />
        <text x="32" y="165" className={styles.svgStrong}>RECORD 03</text>
        <text x="32" y="180" className={styles.svgSmall}>temporary timeout</text>

        <motion.path d="M209 61 C240 61 242 104 275 104" fill="none" stroke="#87987a" strokeWidth="1.8" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={reduceMotion ? { duration: 0 } : { duration: .6, delay: .1 }} />
        <motion.path d="M209 115H275" fill="none" stroke="#87987a" strokeWidth="1.8" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={reduceMotion ? { duration: 0 } : { duration: .6, delay: .25 }} />
        <motion.path d="M209 169 C242 169 242 130 275 130" fill="none" stroke="#b48b43" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={reduceMotion ? { duration: 0 } : { duration: .7, delay: .4 }} />

        <rect x="276" y="76" width="112" height="86" rx="8" fill="#e8ecdf" stroke="#c8d1bb" />
        <circle cx="332" cy="101" r="13" fill="#d4ddc8" />
        <path d="M326 101L331 106L339 96" fill="none" stroke="#315a40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="332" y="129" textAnchor="middle" className={styles.svgStrong}>VALIDATE</text>
        <text x="332" y="144" textAnchor="middle" className={styles.svgSmall}>normalise</text>
        <text x="332" y="180" textAnchor="middle" className={styles.svgMono}>RETRY + RESUME</text>

        <motion.path d="M333 191 C333 214 252 214 252 183 C252 171 264 169 276 169" fill="none" stroke="#b48b43" strokeWidth="1.7" strokeDasharray="4 4" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={reduceMotion ? { duration: 0 } : { duration: .8, delay: .45 }} />
        <motion.path d="M389 119H437" fill="none" stroke="#87987a" strokeWidth="1.8" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={reduceMotion ? { duration: 0 } : { duration: .6, delay: .55 }} />

        <rect x="440" y="69" width="198" height="106" rx="8" fill="#18372a" />
        <text x="458" y="91" className={styles.svgMonoLight}>CANONICAL ENTITY</text>
        <path d="M458 101H620" stroke="#6c846f" strokeWidth="1" />
        <text x="458" y="125" className={styles.svgLightStrong}>One clean record</text>
        <text x="458" y="145" className={styles.svgLight}>validated fields</text>
        <text x="458" y="161" className={styles.svgLightMuted}>duplicates resolved</text>
        <text x="18" y="232" className={styles.svgMono}>COMPLETED WORK STAYS COMPLETED</text>
        <text x="638" y="232" textAnchor="end" className={styles.svgMono}>READY TO SYNC</text>
      </svg>

      <div className={styles.mobileFlow} aria-hidden="true">
        <div><span className={styles.mobileNode}>01</span><strong>Incoming records</strong><small>Mixed formats · duplicate entries</small></div>
        <span className={styles.mobileConnector} />
        <div><span className={styles.mobileNode}>02</span><strong>Retry &amp; validate</strong><small>Recover failed work · normalise fields</small></div>
        <span className={styles.mobileConnector} />
        <div><span className={styles.mobileNode}>03</span><strong>One canonical record</strong><small>Duplicates resolved · ready to sync</small></div>
      </div>
    </>
  );
}

function MindCareScene({ memoryEnabled, reduceMotion }: { memoryEnabled: boolean; reduceMotion: boolean }) {
  return (
    <>
      <svg className={styles.desktopSvg} viewBox="0 0 660 250" role="img" aria-label={memoryEnabled ? "Conversation context is saved because memory is enabled" : "Conversation context is not saved because memory is off"}>
        <rect x="20" y="43" width="214" height="132" rx="9" fill="#fffdf7" stroke="#d8d0bd" />
        <text x="38" y="67" className={styles.svgMono}>CONVERSATION</text>
        <path d="M38 78H214" stroke="#d8d0bd" />
        <rect x="38" y="92" width="166" height="47" rx="7" fill="#e8ecdf" />
        <text x="50" y="111" className={styles.svgSmall}>“I want to pick up</text>
        <text x="50" y="126" className={styles.svgSmall}>where we left off.”</text>
        <path d="M234 109H298" fill="none" stroke="#87987a" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="298" cy="109" r="4" fill="#b48b43" />
        <rect x="299" y="69" width="105" height="80" rx="8" fill="#e8ecdf" stroke="#c8d1bb" />
        <text x="351" y="94" textAnchor="middle" className={styles.svgMono}>PERMISSION</text>
        <path d="M351 105V120" stroke="#87987a" strokeWidth="1.5" />
        <text x="351" y="137" textAnchor="middle" className={styles.svgStrong}>{memoryEnabled ? "ON" : "OFF"}</text>

        <motion.path
          d="M405 109H463"
          fill="none"
          stroke={memoryEnabled ? "#87987a" : "#b9b2a3"}
          strokeWidth="1.8"
          strokeDasharray={memoryEnabled ? "0" : "4 5"}
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: memoryEnabled ? 1 : 0.42, opacity: memoryEnabled ? 1 : .55 }}
          transition={reduceMotion ? { duration: 0 } : { duration: .45, ease: EASE }}
        />
        <motion.rect
          x="465" y="48" width="174" height="123" rx="8"
          fill={memoryEnabled ? "#18372a" : "#f4f0e6"}
          stroke={memoryEnabled ? "#18372a" : "#d8d0bd"}
          strokeDasharray={memoryEnabled ? "0" : "4 4"}
          animate={{ opacity: memoryEnabled ? 1 : .64 }}
          transition={reduceMotion ? { duration: 0 } : { duration: .35 }}
        />
        <text x="482" y="72" className={memoryEnabled ? styles.svgMonoLight : styles.svgMono}>SAVED CONTEXT</text>
        <path d="M482 82H621" stroke={memoryEnabled ? "#6c846f" : "#d8d0bd"} />
        <text x="482" y="105" className={memoryEnabled ? styles.svgLightStrong : styles.svgSmall}> {memoryEnabled ? "Approved preference" : "Nothing stored"} </text>
        <text x="482" y="124" className={memoryEnabled ? styles.svgLight : styles.svgSmall}>{memoryEnabled ? "Available next time" : "Memory is switched off"}</text>
        <text x="482" y="149" className={memoryEnabled ? styles.svgLightMuted : styles.svgMono}> {memoryEnabled ? "USER-APPROVED" : "NO PERSISTENCE"} </text>
        <text x="20" y="232" className={styles.svgMono}>CONVERSATION STAYS PRIVATE BY DEFAULT</text>
        <text x="638" y="232" textAnchor="end" className={styles.svgMono}>{memoryEnabled ? "CONTEXT ENABLED" : "CONTEXT DISABLED"}</text>
      </svg>

      <div className={styles.mobileFlow} aria-hidden="true">
        <div><span className={styles.mobileNode}>01</span><strong>Conversation</strong><small>Context begins in the session</small></div>
        <span className={styles.mobileConnector} />
        <div><span className={styles.mobileNode}>02</span><strong>User permission</strong><small>{memoryEnabled ? "Memory enabled" : "Memory disabled"}</small></div>
        <span className={styles.mobileConnector} />
        <div><span className={styles.mobileNode}>03</span><strong>{memoryEnabled ? "Approved context" : "Nothing stored"}</strong><small>{memoryEnabled ? "Available next time" : "No persistence"}</small></div>
      </div>
    </>
  );
}
