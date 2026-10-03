import BackgroundCanvas from "./components/BackgroundCanvas";
import Header from "./components/Header";
import HeroScene from "./components/HeroScene";
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
    <main className="relative min-h-screen bg-[#060810] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-clip">
      <BackgroundCanvas />
      <Header />

      <HeroScene />
      <Story />
      <Projects />

      <YouTube />

      <ContactSection />

      <Footer />
    </main>
  );
}
