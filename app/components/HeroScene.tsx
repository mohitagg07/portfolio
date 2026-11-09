import Image from "next/image";

export default function HeroScene() {
  return (
    <div className="hero-scroll-stage hero-image-only">
      <section
        id="home"
        className="hero-section hero-section--sticky hero-scene-section"
        aria-label="Mohit Aggarwal portfolio"
      >
        <Image
          src="/assets/hero-background.avif"
          alt="A forest-green creative workspace with a desk, laptop, camera, books, plants and warm window light"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="hero-background-image"
        />
      </section>
    </div>
  );
}
