"use client";

import BackgroundCanvas from "./components/BackgroundCanvas";
import Header from "./components/Header";
import Intro from "./components/Intro";
import HeroGreeting from "./components/HeroGreeting";
import Story from "./components/Story";
import Projects from "./components/Projects";
import InteractiveDemos from "./components/InteractiveDemos";
import YouTube from "./components/YouTube";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="relative min-h-screen bg-[#060810] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* 1. Ultra-lightweight 60fps Starfield Canvas */}
      <Intro />
      <BackgroundCanvas />

      {/* 2. Floating Navbar Header */}
      <Header />

      {/* 3. Signature Cursive Hero Greeting ("hello world!") */}
      <section id="home" className="relative min-h-screen flex items-center">
        <HeroGreeting />
      </section>

      {/* 4. About & Capability Bento Grid */}
      <Story />

      {/* 5. Featured Projects Showcase */}
      <Projects />

      {/* 6. Interactive WebGL & AI Demos Playground */}
      <InteractiveDemos />

      {/* 7. YouTube & Media Showcase */}
      <YouTube />

      {/* 8. Contact Section & Interactive Terminal */}
      <ContactSection />

      {/* 9. Glassmorphic Footer */}
      <Footer />
    </main>
  );
}
