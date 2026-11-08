import BackgroundCanvas from "./components/BackgroundCanvas";
import Header from "./components/Header";
import HeroScene from "./components/HeroScene";
import HeroRobot from "./components/HeroRobot";
import Projects from "./components/Projects";
import Story from "./components/Story";
import dynamic from "next/dynamic";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const YouTube = dynamic(() => import("./components/YouTube"), {
  loading: () => (
    <div className="video-scroll-stage" aria-hidden="true">
      <div className="video-scroll-sticky" />
    </div>
  ),
});

export default function Home(): React.JSX.Element {
  return (
    <main className="portfolio-theme relative min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--accent)] selection:text-[#102b23]">
      <BackgroundCanvas />
      <Header />
      <HeroRobot />

      <HeroScene />
      <Story />
      <Projects />

      <YouTube />

      <ContactSection />

      <Footer />
    </main>
  );
}
