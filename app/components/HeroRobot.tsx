"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type SectionKey = "home" | "about" | "work" | "youtube" | "contact";

export type CharacterAct =
  | "peek"          // Peeking from behind a boundary (Hero start & Videos)
  | "about-peek"    // Peeking from behind the left edge of the About portrait
  | "about-point"   // Pointing towards the About biography after waving
  | "notice-wave"   // Notices visitor, hops slightly, gives a warm wave
  | "fly-swoop"     // Flies along a curved path across open space
  | "stunt-flip"    // Playful loop-de-loop somersault
  | "land-bounce"   // Squash-and-stretch landing
  | "idle-observe"  // Calm, alive studio character looking around
  | "curious-read"  // Leaning in, hand on chin, reading About timeline
  | "inspect-work"  // Holding magnifying glass & pointing at project cards
  | "video-peek"    // Peeking sideways around video thumbnail
  | "video-react"   // Perking up when visitor interacts with a video
  | "contact-wave"  // Warm goodbye wave + gentle departure float
  | "startled-hop"; // Click reaction hop & spin

type EyeExpression = "default" | "peek-side" | "wide" | "squint" | "happy" | "wink";

const CLICK_LINES: readonly string[] = [
  "Okay, that was a pretty good landing.",
  "That one took some serious debugging.",
  "Wait, I want to show you something.",
  "Still here—just checking the alignment.",
  "Try switching LegalMind to the architecture view.",
];

export default function HeroRobot() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [section, setSection] = useState<SectionKey>("home");
  const [act, setAct] = useState<CharacterAct>("peek");
  const [eyes, setEyes] = useState<EyeExpression>("peek-side");

  // Occasional editorial margin note (no box, no status dot, no buttons)
  const [caption, setCaption] = useState<string>("");
  const [showCaption, setShowCaption] = useState(false);

  const charRef = useRef<HTMLDivElement>(null);
  const visitedSectionsRef = useRef<Set<SectionKey>>(new Set());
  const clickCountRef = useRef(0);
  const captionTimerRef = useRef<number | undefined>(undefined);
  const actTimersRef = useRef<number[]>([]);

  const clearActTimers = useCallback(() => {
    actTimersRef.current.forEach((id) => window.clearTimeout(id));
    actTimersRef.current = [];
  }, []);

  const scheduleAct = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs);
    actTimersRef.current.push(id);
    return id;
  }, []);

  const whisper = useCallback((line: string, durationMs = 3400) => {
    if (captionTimerRef.current) window.clearTimeout(captionTimerRef.current);
    setCaption(line);
    setShowCaption(true);
    captionTimerRef.current = window.setTimeout(() => {
      setShowCaption(false);
    }, durationMs);
  }, []);

  // Pause when browser tab is hidden
  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearActTimers();
      if (captionTimerRef.current) window.clearTimeout(captionTimerRef.current);
    };
  }, [clearActTimers]);

  // Deterministic active section tracking synchronized with Header
  useEffect(() => {
    const ids: SectionKey[] = ["about", "work", "youtube", "contact"];
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;

      // Track About portrait coordinates so the robot can peek from behind the photo edge
      const portraitEl = document.querySelector("[data-about-portrait]") as HTMLElement | null;
      if (portraitEl && charRef.current) {
        const pRect = portraitEl.getBoundingClientRect();
        if (pRect.bottom > 0 && pRect.top < window.innerHeight) {
          const isCompact = window.innerWidth <= 960;
          const rawX = pRect.left - (isCompact ? 38 : 48);
          const rawY = pRect.top + Math.min(pRect.height * 0.56, isCompact ? 210 : 260);
          const safeX = Math.max(24, Math.min(window.innerWidth - 88, Math.round(rawX)));
          const safeY = Math.max(118, Math.min(window.innerHeight - 124, Math.round(rawY)));
          charRef.current.style.setProperty("--about-x", `${safeX}px`);
          charRef.current.style.setProperty("--about-y", `${safeY}px`);
        }
      }

      if (window.scrollY < 220) {
        setSection((prev) => (prev !== "home" ? "home" : prev));
        return;
      }

      const triggerY = window.innerHeight * 0.35;
      let matched: SectionKey = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom > triggerY) {
          matched = id;
          break;
        }
      }
      setSection((prev) => (prev !== matched ? matched : prev));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  // Section-specific character choreography (Hero, About, Work, Videos, Contact)
  useEffect(() => {
    clearActTimers();

    if (!mounted) {
      const mountTimer = window.setTimeout(() => {
        setMounted(true);
      }, 450);
      actTimersRef.current.push(mountTimer);
      return;
    }

    const firstTimeHere = !visitedSectionsRef.current.has(section);
    visitedSectionsRef.current.add(section);

    if (prefersReducedMotion) {
      if (section === "work") {
        setAct("inspect-work");
        setEyes("squint");
      } else if (section === "youtube") {
        setAct("video-peek");
        setEyes("peek-side");
      } else if (section === "about") {
        setAct("about-peek");
        setEyes("peek-side");
      } else if (section === "contact") {
        setAct("contact-wave");
        setEyes("happy");
      } else {
        setAct("idle-observe");
        setEyes("default");
      }
      return;
    }

    if (section === "home") {
      // A quiet studio hello: peek out, wave once, then settle into a gentle idle.
      setAct("peek");
      setEyes("peek-side");

      scheduleAct(() => {
        setAct("notice-wave");
        setEyes("happy");
        if (firstTimeHere) {
          whisper("Psst — have a look around.", 2800);
        }
      }, 1150);

      scheduleAct(() => {
        setAct("idle-observe");
        setEyes("default");
      }, 2250);
    } else if (section === "about") {
      // 1. Peek from behind the photo -> 2. Give a small wave + short playful message -> 3. Point towards biography -> 4. Calm peek
      setAct("about-peek");
      setEyes("peek-side");

      scheduleAct(() => {
        setAct("notice-wave");
        setEyes("happy");
        if (firstTimeHere) {
          whisper("Psst — he really does ask that before every build.", 3400);
        }
      }, 700);

      scheduleAct(() => {
        setAct("about-point");
        setEyes("wink");
      }, 2200);

      scheduleAct(() => {
        setAct("about-peek");
        setEyes("peek-side");
      }, 4800);
    } else if (section === "work") {
      // Travel -> land -> pull out magnifying glass & point toward project previews
      setAct("fly-swoop");
      setEyes("default");

      scheduleAct(() => {
        setAct("land-bounce");
        setEyes("happy");
      }, 750);

      scheduleAct(() => {
        setAct("inspect-work");
        setEyes("squint");
        if (firstTimeHere) {
          whisper("Ah, here's the good stuff.", 3100);
        }
      }, 1600);
    } else if (section === "youtube") {
      // Peek sideways around video stage
      setAct("video-peek");
      setEyes("peek-side");
    } else if (section === "contact") {
      // Wave warmly & perform a gentle departure salute
      setAct("land-bounce");
      setEyes("happy");

      scheduleAct(() => {
        setAct("contact-wave");
        setEyes("happy");
        if (firstTimeHere) {
          whisper("He usually replies pretty quickly.", 3200);
        }
      }, 800);
    }
  }, [section, mounted, prefersReducedMotion, clearActTimers, scheduleAct, whisper]);

  // Subtle ambient life while staying in Hero or About (occasional look-around or mini-stunt with long calm pauses)
  useEffect(() => {
    if (!mounted || prefersReducedMotion || pageHidden) return;
    if (section !== "home") return;

    const interval = window.setInterval(() => {
      if (act !== "idle-observe") return;
      setAct("notice-wave");
      setEyes("happy");

      scheduleAct(() => {
        setAct("idle-observe");
        setEyes("default");
      }, 850);
    }, 22000);

    return () => window.clearInterval(interval);
  }, [mounted, prefersReducedMotion, pageHidden, section, act, scheduleAct]);

  // Listen to real portfolio content interactions in #work and #youtube
  useEffect(() => {
    if (!mounted) return;

    let lastReactTime = 0;
    const canReact = () => {
      const now = Date.now();
      if (now - lastReactTime < 5500) return false;
      lastReactTime = now;
      return true;
    };

    const handleAboutInteraction = (e: Event) => {
      if (section !== "about") return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("[data-about-interactive]") as HTMLElement | null;
      if (!interactiveEl) return;

      const key = interactiveEl.dataset.aboutInteractive || "";
      if (key === "portrait") {
        if (!canReact()) return;
        setAct("about-point");
        setEyes("happy");
        whisper("Psst — he really does ask that before every build.", 3200);
        scheduleAct(() => {
          setAct("about-peek");
          setEyes("peek-side");
        }, 2800);
      } else if (key === "mindcare-artifact" || key === "milestone-mindcare") {
        if (!canReact()) return;
        setEyes("happy");
        whisper("MindCare lets people decide what context stays between sessions.", 3300);
      } else if (key === "scraper-artifact" || key === "milestone-scraper") {
        if (!canReact()) return;
        setEyes("wide");
        whisper("Turning messy public listings into clean records without manual copy-paste.", 3400);
      } else if (key === "milestone-berger") {
        if (!canReact()) return;
        setEyes("wink");
        whisper("August to December 2023—where real production workflows clicked.", 3200);
      } else if (key === "stage-understand") {
        if (!canReact()) return;
        setEyes("squint");
        whisper("Sitting with the problem first saves a lot of unnecessary code.", 3200);
      } else if (key === "stage-build") {
        if (!canReact()) return;
        setEyes("happy");
        whisper("Simple, working software beats over-engineered diagrams every time.", 3200);
      } else if (key === "stage-refine") {
        if (!canReact()) return;
        setEyes("wink");
        whisper("Notice what feels clunky in real use, then strip away the noise.", 3200);
      }
    };

    const handleWorkInteraction = (e: Event) => {
      if (section !== "work") return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const text = target.textContent || "";
      if (text.includes("Architecture") || target.closest("[id^='step-']")) {
        if (!canReact()) return;
        setEyes("wide");
        whisper("That Indian Kanoon retrieval pipeline took some serious debugging.", 3600);
        scheduleAct(() => setEyes("squint"), 2600);
      } else if (text.includes("MindCare") || text.includes("Session UI")) {
        if (!canReact()) return;
        setEyes("happy");
        whisper("Built so people choose what context stays between sessions.", 3400);
        scheduleAct(() => setEyes("squint"), 2600);
      } else if (text.includes("Scraper") || text.includes("Deduplication")) {
        if (!canReact()) return;
        setEyes("wide");
        whisper("Deduplicating messy directory listings saved hours of manual cleanup.", 3500);
        scheduleAct(() => setEyes("squint"), 2600);
      } else if (text.includes("Indemnity") || text.includes("Auto-Renewal")) {
        if (!canReact()) return;
        setEyes("wink");
        whisper("Explaining a clause clearly without crossing into legal advice.", 3400);
        scheduleAct(() => setEyes("squint"), 2500);
      } else if (text.includes("Innovix")) {
        if (!canReact()) return;
        setEyes("wink");
        whisper("Clean, fast, and straight to the enquiry flow.", 3200);
        scheduleAct(() => setEyes("squint"), 2400);
      }
    };

    const handleVideoInteraction = () => {
      if (section !== "youtube") return;
      if (!canReact()) return;
      setAct("video-react");
      setEyes("wide");
      whisper("Wait, this one is worth watching with sound.", 3200);
      scheduleAct(() => {
        setAct("video-peek");
        setEyes("peek-side");
      }, 2800);
    };

    const aboutEl = document.getElementById("about");
    const workEl = document.getElementById("work");
    const ytEl = document.getElementById("youtube");

    aboutEl?.addEventListener("pointerover", handleAboutInteraction, { passive: true });
    aboutEl?.addEventListener("click", handleAboutInteraction, { passive: true });
    workEl?.addEventListener("pointerover", handleWorkInteraction, { passive: true });
    workEl?.addEventListener("click", handleWorkInteraction, { passive: true });
    ytEl?.addEventListener("pointerover", handleVideoInteraction, { passive: true });
    ytEl?.addEventListener("click", handleVideoInteraction, { passive: true });

    return () => {
      aboutEl?.removeEventListener("pointerover", handleAboutInteraction);
      aboutEl?.removeEventListener("click", handleAboutInteraction);
      workEl?.removeEventListener("pointerover", handleWorkInteraction);
      workEl?.removeEventListener("click", handleWorkInteraction);
      ytEl?.removeEventListener("pointerover", handleVideoInteraction);
      ytEl?.removeEventListener("click", handleVideoInteraction);
    };
  }, [mounted, section, scheduleAct, whisper]);

  const handleCharacterClick = () => {
    clearActTimers();
    const line = CLICK_LINES[clickCountRef.current % CLICK_LINES.length];
    clickCountRef.current += 1;

    whisper(line, 3400);

    if (prefersReducedMotion) return;

    setAct("startled-hop");
    setEyes("wide");

    scheduleAct(() => {
      setAct("land-bounce");
      setEyes("wink");
    }, 950);

    scheduleAct(() => {
      if (section === "work") {
        setAct("inspect-work");
        setEyes("squint");
      } else if (section === "youtube") {
        setAct("video-peek");
        setEyes("peek-side");
      } else if (section === "about") {
        setAct("about-peek");
        setEyes("peek-side");
      } else if (section === "contact") {
        setAct("contact-wave");
        setEyes("happy");
      } else {
        setAct("idle-observe");
        setEyes("default");
      }
    }, 1900);
  };

  const isLightSurface = section === "work";

  return (
    <div
      className={`m-char-layer ${pageHidden ? "is-page-hidden" : ""}`}
      aria-hidden="false"
    >
      <div
        ref={charRef}
        className={[
          "m-char",
          `m-char--${section}`,
          `act-${act}`,
          `eyes-${eyes}`,
          isLightSurface ? "is-light-surface" : "",
          mounted ? "is-mounted" : "",
          prefersReducedMotion ? "is-reduced-motion" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="m-char__anchor">
          {/* Unboxed Editorial Margin Note + Hand-Drawn Leader Tick */}
          <div
            role="status"
            aria-live="polite"
            className={`m-char__note ${showCaption ? "is-visible" : ""}`}
          >
            <span className="m-char__note-copy">{caption}</span>
            <svg
              width="22"
              height="14"
              viewBox="0 0 22 14"
              fill="none"
              className="m-char__note-leader"
              aria-hidden="true"
            >
              <path
                d="M2 2C7 9 13 11 20 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Hand-Crafted 2D Illustrated Character ("M-Sprite") */}
          <button
            type="button"
            onClick={handleCharacterClick}
            aria-label="Little studio character"
            className="m-char__btn"
          >
            <svg
              width="78"
              height="86"
              viewBox="0 0 84 92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="m-char__svg"
              aria-hidden="true"
            >
              {/* Soft Ink Ground Shadow */}
              <ellipse
                cx="42"
                cy="84"
                rx="14"
                ry="3"
                fill="rgba(10, 15, 22, 0.34)"
                className="m-char__shadow"
              />

              {/* Motion Sketch Lines (visible only during swoop flight / flip / departure) */}
              <g className="m-char__wind" stroke="#72E6BC" strokeWidth="1.5" strokeLinecap="round">
                <path d="M8 46C13 44 17 44 21 46" opacity="0.65" />
                <path d="M11 55C15 54 18 54 22 55" opacity="0.45" />
              </g>

              {/* Main Character Rig */}
              <g className="m-char__rig">
                {/* Little Articulated Sketch Legs / Boots */}
                <g className="m-char__legs">
                  <path
                    d="M35 67L34 76C34 77.5 31.5 78 29.5 77.5"
                    stroke="#141C22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="m-char__leg-left"
                  />
                  <path
                    d="M49 67L50 76C50 77.5 52.5 78 54.5 77.5"
                    stroke="#141C22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="m-char__leg-right"
                  />
                </g>

                {/* Left Arm (Waves in Hero/Contact, points toward project preview in #work) */}
                <g className="m-char__arm-left">
                  <path
                    d="M26 51C20 52 16 56 15 61"
                    stroke="#141C22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="14.5"
                    cy="61.5"
                    r="3.2"
                    fill="#F3EFE6"
                    stroke="#141C22"
                    strokeWidth="2"
                  />
                </g>

                {/* Torso — Hand-Drawn Tapered Sketch Body + Subtle 'M' Stitch Emblem */}
                <g className="m-char__torso">
                  <path
                    d="M28 45C27.2 53 28.5 62 31.5 66.5C34 68.5 50 68.5 52.5 66.5C55.5 62 56.8 53 56 45C55.2 42.5 28.8 42.5 28 45Z"
                    fill="#F3EFE6"
                    stroke="#141C22"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  {/* Hand-shaded cel shadow on right side of torso */}
                  <path
                    d="M48 45.5C51.5 52 51.8 60 49.5 66.2C51.2 65.8 52.2 65.2 52.8 64.2C55 60 55.5 52 54.5 45.5H48Z"
                    fill="#DFD8C8"
                  />
                  {/* Subtle 'M' Brand Monogram Stitched on Chest */}
                  <path
                    d="M37.5 58.5V51.5L42 56L46.5 51.5V58.5"
                    stroke="#141C22"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="42" cy="48.5" r="1.3" fill="#5CE0B2" />
                </g>

                {/* Articulated Head — Twin-Peak 'M' Crown Silhouette */}
                <g className="m-char__head">
                  {/* Subtle 'M'-Shaped Crown / Twin-Ear Silhouette */}
                  <path
                    d="M21 31C20.2 22 22 14 25.5 12.5C28.5 11.2 35 18.5 42 19.2C49 18.5 55.5 11.2 58.5 12.5C62 14 63.8 22 63 31C62.2 40.5 56.5 44.5 42 44.8C27.5 44.5 21.8 40.5 21 31Z"
                    fill="#F3EFE6"
                    stroke="#141C22"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Hand-drawn cel-shading along right cheek/crown */}
                  <path
                    d="M55 14.5C58.2 18 59.5 24.5 59 31.5C58.4 38.5 54 42 46 43.2C55.5 42.8 60.5 39.2 61.2 31C61.8 23.2 60.2 16 57.5 13.8L55 14.5Z"
                    fill="#DFD8C8"
                  />

                  {/* Mint Accent Stitch on Left Crown Peak */}
                  <path
                    d="M25.5 16L28.5 18.5"
                    stroke="#5CE0B2"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Charcoal Ink Faceplate */}
                  <path
                    d="M26.5 29.5C26.2 24.2 30.5 21.5 42 21.5C53.5 21.5 57.8 24.2 57.5 29.5C57.2 36.2 53.2 39.5 42 39.5C30.8 39.5 26.8 36.2 26.5 29.5Z"
                    fill="#141C22"
                  />

                  {/* Expressive Eyes & Brow Group */}
                  <g className="m-char__gaze">
                    {eyes === "default" && (
                      <g className="m-char__blink">
                        <ellipse cx="35.5" cy="30.5" rx="3.1" ry="3.8" fill="#F3EFE6" />
                        <ellipse cx="48.5" cy="30.5" rx="3.1" ry="3.8" fill="#F3EFE6" />
                        <circle cx="36.3" cy="29.5" r="1.2" fill="#5CE0B2" />
                        <circle cx="49.3" cy="29.5" r="1.2" fill="#5CE0B2" />
                      </g>
                    )}

                    {eyes === "peek-side" && (
                      <g>
                        <ellipse cx="33.5" cy="30.2" rx="3" ry="3.6" fill="#F3EFE6" />
                        <ellipse cx="46.5" cy="30.2" rx="3" ry="3.6" fill="#F3EFE6" />
                        <circle cx="32.2" cy="29.6" r="1.25" fill="#5CE0B2" />
                        <circle cx="45.2" cy="29.6" r="1.25" fill="#5CE0B2" />
                      </g>
                    )}

                    {eyes === "wide" && (
                      <g>
                        <circle cx="35.5" cy="30" r="4" fill="#F3EFE6" />
                        <circle cx="48.5" cy="30" r="4" fill="#F3EFE6" />
                        <circle cx="36.5" cy="28.8" r="1.4" fill="#5CE0B2" />
                        <circle cx="49.5" cy="28.8" r="1.4" fill="#5CE0B2" />
                      </g>
                    )}

                    {eyes === "squint" && (
                      <g>
                        {/* Inquisitive asymmetric eyes: left eye narrowed, right eye raised */}
                        <ellipse cx="35.2" cy="31.2" rx="3.2" ry="2.2" fill="#F3EFE6" />
                        <ellipse cx="48.5" cy="29.8" rx="3.3" ry="4" fill="#F3EFE6" />
                        <path
                          d="M31.8 27.2L38.5 28.4"
                          stroke="#5CE0B2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <circle cx="34.5" cy="31" r="1.1" fill="#5CE0B2" />
                        <circle cx="47.8" cy="29.2" r="1.2" fill="#5CE0B2" />
                      </g>
                    )}

                    {eyes === "happy" && (
                      <g>
                        <path
                          d="M32.2 31.8C33.6 28.2 37.4 28.2 38.8 31.8"
                          stroke="#F3EFE6"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M45.2 31.8C46.6 28.2 50.4 28.2 51.8 31.8"
                          stroke="#F3EFE6"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </g>
                    )}

                    {eyes === "wink" && (
                      <g>
                        <ellipse cx="35.5" cy="30.5" rx="3.1" ry="3.8" fill="#F3EFE6" />
                        <circle cx="36.3" cy="29.5" r="1.2" fill="#5CE0B2" />
                        <path
                          d="M45.2 31.2C46.8 28.4 50.2 28.4 51.8 31.2"
                          stroke="#5CE0B2"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </g>
                </g>

                {/* Right Arm + Contextual Hand-Drawn Magnifying Glass Prop (active in #work) */}
                <g className="m-char__arm-right">
                  <path
                    d="M57 51C63 52 67 56 68 61"
                    stroke="#141C22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="68.5"
                    cy="61.5"
                    r="3.2"
                    fill="#F3EFE6"
                    stroke="#141C22"
                    strokeWidth="2"
                  />

                  {/* Hand-Drawn Magnifying Glass Prop (shown when inspecting projects in #work) */}
                  <g className="m-char__prop-magnifier">
                    <line
                      x1="67"
                      y1="59"
                      x2="73"
                      y2="50"
                      stroke="#141C22"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="76"
                      cy="43"
                      r="8.5"
                      fill="rgba(92, 224, 178, 0.18)"
                      stroke="#141C22"
                      strokeWidth="2.3"
                    />
                    <path
                      d="M73 38.5C74.8 37.2 77.2 37.2 79 38.5"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
