import HeroGreeting from "./HeroGreeting";

export default function HeroScene() {
  return (
    <div className="hero-scroll-stage hero-image-only">
      <section
        id="home"
        className="hero-section hero-section--sticky hero-scene-section"
        aria-labelledby="hero-title"
      >
        <div className="hero-image-shade" aria-hidden="true" />
        <HeroGreeting />
      </section>
    </div>
  );
}
