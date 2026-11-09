"use client";

import Image from "next/image";
import HeroGreeting from "./HeroGreeting";

const WORKFLOW = ["Build", "Automate", "Refine", "Ship"];

export default function HeroScene() {
  return (
    <div className="hero-scroll-stage">
      <section
        id="home"
        className="hero-section hero-section--sticky hero-scene-section relative"
        aria-labelledby="hero-title"
      >
        <div className="hero-art">
          <div className="hero-room-backdrop" aria-hidden="true" />
          <div className="hero-room-vignette" aria-hidden="true" />

          <figure className="hero-art__picture">
            <Image
              src="/assets/mohit-story.jpg"
              alt="Mohit Aggarwal seated outdoors in a dark suit and sunglasses"
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 42vw, 570px"
              quality={92}
              className="hero-art__image"
            />
            <figcaption className="hero-art__caption">
              <span>MOHIT AGGARWAL</span>
              <span>JAMMU, INDIA</span>
            </figcaption>
          </figure>

          <div className="hero-room-notes" aria-label="A simple working rhythm">
            {WORKFLOW.map((step, index) => (
              <span key={step} className={index % 2 ? "is-offset" : ""}>
                {step}
                <i aria-hidden="true">✓</i>
              </span>
            ))}
          </div>

          <span className="hero-room-credit">
            WORKSPACE PHOTO · ERGONOFIS / UNSPLASH
          </span>
        </div>

        <HeroGreeting />
      </section>
    </div>
  );
}
