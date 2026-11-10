"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { navigateToSection, scrollToSection } from "../utils/scroll";

const LINKS = [["About", "about"], ["Work", "work"], ["Videos", "youtube"], ["Contact", "contact"]] as const;
const SOCIALS = [["GitHub", "https://github.com/mohitagg07"], ["YouTube", "https://youtube.com/@MohitAgg07"], ["LinkedIn", "https://linkedin.com/in/mohitagg07"]] as const;

export default function Header() {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const pendingNavigationRef = useRef<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    let lastScrolled: boolean | undefined;
    let lastActive: string | undefined;
    let scrollFrame = 0;
    const updateScrollState = () => {
      scrollFrame = 0;
      const y = window.scrollY;
      const nextScrolled = y > 40;
      const nextNearTop = y < 200;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }

      let nextActive = "";
      if (!nextNearTop) {
        const triggerY = window.innerHeight * 0.35;
        for (const [, id] of LINKS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            nextActive = id;
            break;
          }
        }
      }
      if (nextActive !== lastActive) {
        lastActive = nextActive;
        setActive(nextActive);
      }
    };
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateScrollState);
    };
    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    // Freeze the document at its exact scroll position. This works on Android
    // Chrome and iOS Safari, unlike body overflow:hidden on its own.
    const scrollY = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const previousBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
    };
    const previousRoot = {
      overflow: root.style.overflow,
      overscrollBehavior: root.style.overscrollBehavior,
    };

    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    const focusFrame = window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = menuPanelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);

      body.style.position = previousBody.position;
      body.style.top = previousBody.top;
      body.style.left = previousBody.left;
      body.style.right = previousBody.right;
      body.style.width = previousBody.width;
      body.style.overflow = previousBody.overflow;
      body.style.overscrollBehavior = previousBody.overscrollBehavior;
      root.style.overflow = previousRoot.overflow;
      root.style.overscrollBehavior = previousRoot.overscrollBehavior;

      // Restore the same scroll point before any pending section navigation.
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (open || !pendingNavigationRef.current) return;
    const id = pendingNavigationRef.current;
    pendingNavigationRef.current = null;
    const frame = window.requestAnimationFrame(() => scrollToSection(id));
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    pendingNavigationRef.current = id;
    setOpen(false);
  };

  const bar = "absolute left-2.5 h-0.5 w-5 rounded bg-white transition-transform duration-300";

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${active === "about" ? "is-about-active" : ""} ${open ? "is-menu-open" : ""}`}>
        <div className="site-header__glass mx-auto flex items-center justify-between px-5 py-4 md:px-12">
          <span className="site-header__depth" aria-hidden="true" />
          <a href="#home" onClick={(event) => {
              if (open) {
                event.preventDefault();
                pendingNavigationRef.current = "home";
                setOpen(false);
              } else {
                navigateToSection(event, "home");
              }
            }} aria-label="Mohit Aggarwal home" className="site-header__brand">
            <svg width="36" height="36" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="logo-g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="30" y2="30">
                  <stop stopColor="#c69a43" /><stop offset="1" stopColor="#8dd7b6" />
                </linearGradient>
              </defs>
              <path d="M4 25V5l11 13L26 5v20" stroke="url(#logo-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="site-header__brand-copy" aria-hidden="true">
              <span>Mohit Aggarwal</span>
              <small>Software engineer</small>
            </span>
          </a>

          <nav className="site-header__nav hidden items-center gap-2 md:flex" aria-label="Main">
            {LINKS.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => { if (navigateToSection(event, id)) setActive(id); }}
                className={`site-header__link ${active === id ? "is-active" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" onClick={(event) => { if (navigateToSection(event, "contact")) setActive("contact"); }} className="site-header__cta hidden whitespace-nowrap md:inline-flex">
              Let&apos;s talk
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-haspopup="true"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative h-10 w-10 md:hidden"
            >
              <span className={`${bar} top-[15px]`} style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }} />
              <span className={`${bar} top-[23px]`} style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {portalReady && createPortal(
        <div
          ref={menuPanelRef}
          id="mobile-navigation"
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal={open ? "true" : undefined}
          aria-hidden={!open}
          inert={!open}
          className={`site-header__mobile md:hidden ${open ? "is-open" : ""}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 75,
            width: "100vw",
            height: "100dvh",
            minHeight: "100svh",
            overflowY: "auto",
            overflowX: "hidden",
            overscrollBehavior: "contain",
            background: "rgba(8, 20, 13, .985)",
            paddingTop: "calc(82px + env(safe-area-inset-top))",
            paddingBottom: "calc(28px + env(safe-area-inset-bottom))",
            WebkitBackdropFilter: "blur(18px)",
            backdropFilter: "blur(18px)",
          }}
        >
          <div className="flex min-h-full flex-col justify-between px-8 pb-8">
            <ul className="space-y-2">
              {LINKS.map(([label, id], i) => (
                <li
                  key={id}
                  style={{
                    transform: open ? "none" : "translateY(28px)",
                    opacity: open ? 1 : 0,
                    transition: "opacity .36s ease, transform .4s cubic-bezier(.16,1,.3,1)",
                    transitionDelay: open ? `${80 + i * 55}ms` : "0ms",
                  }}
                >
                  <a
                    href={`#${id}`}
                    onClick={(event) => navigateFromMenu(event, id)}
                    className="block text-[clamp(40px,12vw,64px)] font-bold leading-[1.15]"
                    style={{ fontFamily: "var(--font-main)", color: active === id ? "var(--accent)" : "var(--fg)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ opacity: open ? 1 : 0, transition: "opacity .5s ease .45s" }}>
              <a href="mailto:mohitaggarwal2003@gmail.com" className="block text-sm text-[var(--fg-muted)]">mohitaggarwal2003@gmail.com</a>
              <div className="mt-4 flex gap-6 text-sm font-medium">
                {SOCIALS.map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
