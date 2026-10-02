import BackgroundCanvas from "./components/BackgroundCanvas";
import Header from "./components/Header";
import HeroGreeting from "./components/HeroGreeting";
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
