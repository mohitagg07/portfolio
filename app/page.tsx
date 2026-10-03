import BackgroundCanvas from "./components/BackgroundCanvas";
import Header from "./components/Header";
import HeroGreeting from "./components/HeroGreeting";
import Image from "next/image";
import Story from "./components/Story";
import Projects from "./components/Projects";
import YouTube from "./components/YouTube";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="relative min-h-screen bg-[#060810] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <BackgroundCanvas />
      <Header />

      <section id="home" className="hero-section relative flex min-h-[100svh] items-center">
        <div className="hero-art" aria-hidden="true">
          <picture className="hero-art__picture">
            <source media="(max-width: 680px)" srcSet="/hero-workspace-mobile.webp" />
            <Image
              src="/hero-workspace.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-art__image"
            />
          </picture>
          <div className="hero-art__shade" />
          <div className="hero-art__glow" />
        </div>
        <HeroGreeting />
      </section>

      <Story />

      <Projects />

      <YouTube />

      <ContactSection />

      <Footer />
    </main>
  );
}
