import HeroGreeting from "./HeroGreeting";

export default function HeroScene() {
  return (
    <section
      id="home"
      className="hero-v3"
      aria-labelledby="hero-v3-title"
    >
      <div className="hero-v3__surface" aria-hidden="true" />
      <HeroGreeting />
    </section>
  );
}
