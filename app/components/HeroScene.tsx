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
        <div className="hero-art">
          <div className="hero-art__ambient" aria-hidden="true" />
          <figure className="hero-art__picture">
            <Image
              src="/assets/mohit-story.jpg"
              alt="Mohit Aggarwal seated outdoors in a dark suit and sunglasses"
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 42vw, 560px"
              quality={92}
              className="hero-art__image"
            />
          </figure>
        </div>
        <HeroGreeting />
      </section>
    </div>
  );
}
