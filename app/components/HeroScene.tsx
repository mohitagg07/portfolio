import Image from "next/image";
import HeroGreeting from "./HeroGreeting";

export default function HeroScene() {
  return (
    <div className="hero-scroll-stage hero-image-only">
      <section
        id="home"
        className="hero-section hero-section--sticky hero-scene-section"
        aria-labelledby="hero-title"
      >
        <Image
          src="/assets/hero-background.avif"
          alt="A warm, forest-green workspace with a desk, laptop, camera, books, plants and window light"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="hero-background-image"
        />
        <div className="hero-image-shade" aria-hidden="true" />
        <div className="hero-portrait-banner" aria-hidden="true">
          <svg className="hero-portrait-banner__orbit" viewBox="0 0 600 620" fill="none">
            <ellipse className="hero-portrait-banner__ring" cx="300" cy="310" rx="242" ry="286" />
            <ellipse className="hero-portrait-banner__ring hero-portrait-banner__ring--dashed" cx="300" cy="310" rx="226" ry="270" transform="rotate(17 300 310)" />
            <path className="hero-portrait-banner__arc" d="M74 380C100 506 187 588 301 596" />
            <circle className="hero-portrait-banner__satellite" cx="522" cy="152" r="7" />
            <circle className="hero-portrait-banner__satellite hero-portrait-banner__satellite--small" cx="84" cy="436" r="4" />
          </svg>
          <span className="hero-portrait-banner__plate hero-portrait-banner__plate--top">
            <i />
            FIELD NOTES <b> / 01</b>
          </span>
          <span className="hero-portrait-banner__plate hero-portrait-banner__plate--left">AI SYSTEMS</span>
          <span className="hero-portrait-banner__plate hero-portrait-banner__plate--right">WEB APPS <b>·</b> AUTOMATION</span>
          <span className="hero-portrait-banner__signature">MOHIT AGGARWAL <b>—</b> SOFTWARE ENGINEER</span>
        </div>
        <HeroGreeting />
      </section>
    </div>
  );
}
