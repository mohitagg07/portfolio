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

          <div className="hero-studio__desk">
            <div className="hero-studio__laptop">
              <div className="hero-studio__laptop-screen">
                <span className="hero-studio__laptop-mark">M.</span>
                <span className="hero-studio__laptop-caption">MADE WITH INTENTION</span>
              </div>
              <div className="hero-studio__laptop-base" />
            </div>

            <div className="hero-studio__mug">
              <span>M.</span>
            </div>

            <div className="hero-studio__books">
              <span>AI SYSTEMS</span>
              <span>PRODUCT BUILDING</span>
              <span>SYSTEM DESIGN</span>
            </div>
          </div>

          <div className="hero-studio__light" />
        </div>

        <HeroGreeting />
      </section>
    </div>
  );
}
