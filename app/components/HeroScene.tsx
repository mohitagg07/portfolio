"use client";

import Image from "next/image";
import HeroGreeting from "./HeroGreeting";

export default function HeroScene() {
  return (
    <div className="hero-scroll-stage">
      <section
        id="home"
        className="hero-section hero-section--sticky hero-scene-section relative flex items-center"
        aria-labelledby="hero-title"
      >
        <div className="hero-art" aria-hidden="true">
          <div className="hero-art__ambient" />
          <div className="hero-art__picture">
            <Image
              src="/assets/mohit-story.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 88vw, (max-width: 1100px) 46vw, 640px"
              quality={90}
              className="hero-art__image"
            />
          </div>
          <div className="hero-art__shade" />
          <div className="hero-art__glow" />

          <div className="hero-art__window" />
          <div className="hero-art__shelf">
            <span>BUILD</span><span>REFINE</span><span>SHIP</span>
          </div>
          <div className="hero-art__deskline" />
        </div>

        <HeroGreeting />
      </section>
    </div>
  );
}
