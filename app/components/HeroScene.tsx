"use client";

import Image from "next/image";
import HeroGreeting from "./HeroGreeting";
import HeroSoundtrack from "./HeroSoundtrack";

export default function HeroScene() {
  return (
    <section
      id="home"
      className="hero-v3"
      aria-labelledby="hero-v3-title"
    >
      <Image
        src="/assets/hero-background.avif"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hero-v3__image"
        aria-hidden="true"
      />
      <div className="hero-v3__shade" aria-hidden="true" />
      <HeroGreeting />
      <HeroSoundtrack />
    </section>
  );
}
