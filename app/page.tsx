import Header from "./components/Header";
import Banner from "./components/Banner";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import Projects from "./components/Projects";
import YouTube from "./components/YouTube";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main>
      <Header />
      <Banner />
      <About />
      <WhatIDo />
      <Projects />
      <YouTube />
      <Contact />
      <Footer />
    </main>
  );
}
