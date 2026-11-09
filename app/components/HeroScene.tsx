"use client";

import Image from "next/image";
import HeroGreeting from "./HeroGreeting";

const WORKFLOW_STEPS = ["Build", "Automate", "Iterate", "Ship"];

export default function HeroScene() {
  return (
    <div className="hero-scroll-stage">
      <section
        id="home"
        className="hero-section hero-section--sticky hero-scene-section relative flex items-center"
        aria-labelledby="hero-title"
      >
        <div className="hero-art">
          <div className="hero-art__ambient" aria-hidden="true" />
          <div className="hero-room__window" aria-hidden="true">
            <span className="hero-room__window-light" />
          </div>

          <div className="hero-room__shelf" aria-hidden="true">
            <div className="hero-room__shelf-books">
              <i /><i /><i /><i /><i /><i />
            </div>
            <div className="hero-room__shelf-plants" />
            <span className="hero-room__shelf-edge" />
          </div>

          <div className="hero-room__artwork" aria-hidden="true">
            <span />
          </div>

          <div className="hero-room__notes" aria-label="A simple working rhythm">
            {WORKFLOW_STEPS.map((step, index) => (
              <span key={step} className={index % 2 === 1 ? "is-offset" : ""}>
                {step}
                <i aria-hidden="true">✓</i>
              </span>
            ))}
          </div>

          <figure className="hero-art__picture">
            <Image
              src="/assets/mohit-story.jpg"
              alt="Mohit Aggarwal seated outdoors in a dark suit"
              fill
              priority
              sizes="(max-width: 767px) 82vw, (max-width: 1100px) 42vw, 620px"
              quality={92}
              className="hero-art__image"
            />
            <span className="hero-art__portrait-caption">MOHIT AGGARWAL · JAMMU, INDIA</span>
          </figure>

          <div className="hero-art__shade" aria-hidden="true" />
          <div className="hero-art__glow" aria-hidden="true" />

          <div className="hero-studio__desk" aria-hidden="true">
            <div className="hero-studio__laptop">
              <div className="hero-studio__laptop-screen">
                <span className="hero-studio__laptop-mark">M.</span>
                <span className="hero-studio__laptop-caption">MADE WITH INTENTION</span>
              </div>
              <div className="hero-studio__laptop-base" />
            </div>
            <div className="hero-studio__mug"><span>M.</span></div>
            <div className="hero-studio__books">
              <span>AI &amp; LLMS</span>
              <span>SYSTEM DESIGN</span>
              <span>PRODUCT BUILDING</span>
            </div>
            <div className="hero-studio__plant"><i /><i /><i /><i /><b /></div>
          </div>

          <span className="hero-scene__grain" aria-hidden="true" />
        </div>

        <HeroGreeting />
      </section>
    </div>
  );
}
