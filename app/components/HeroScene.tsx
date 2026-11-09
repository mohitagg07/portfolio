"use client";

import Image from "next/image";
import HeroGreeting from "./HeroGreeting";

export default function HeroScene() {
  return (
    <div className="hero-scroll-stage">
      <section
        id="home"
        className="hero-section hero-section--sticky hero-scene-section relative"
        aria-labelledby="hero-title"
      >
        <div className="hero-art" aria-hidden="true">
          <div className="hero-art__ambient" />
          <figure className="hero-art__picture">
            <Image
              src="/assets/mohit-story.jpg"
              alt="Mohit Aggarwal in a dark suit outdoors"
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1100px) 44vw, 560px"
              quality={92}
              className="hero-art__image"
            />
            <figcaption className="hero-art__portrait-caption">
              <span>MOHIT AGGARWAL</span>
              <span>JAMMU, INDIA</span>
            </figcaption>
          </figure>
          <div className="hero-art__edge" />
        </div>

        <HeroGreeting />
      </section>
    </div>
  );
}
