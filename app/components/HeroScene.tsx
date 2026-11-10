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
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="hero-background-image"
          aria-hidden="true"
        />
        <div className="hero-image-shade" aria-hidden="true" />
        <HeroGreeting />
      </section>
    </div>
  );
}
