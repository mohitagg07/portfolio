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
          quality={92}
          sizes="100vw"
          className="hero-background-image"
        />
        <div className="hero-image-shade" aria-hidden="true" />
        <HeroGreeting />
      </section>
    </div>
  );
}
