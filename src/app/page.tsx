import Contact from "./components/home/Contact";
import Writing from "./components/home/Writing";
import Hero from "./components/home/Hero";
import Projects from "./components/home/Projects";
import Skills from "./components/home/Skills";
import Experience from "./components/home/Experience";
import Education from "./components/home/Education";
import Achievements from "./components/home/Achievements";
import Recommendations from "./components/home/Recommendations";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Recommendations />
      <Projects />
      <Writing />
      <Education />
      <Achievements />
      <Contact />
    </>
  );
}
