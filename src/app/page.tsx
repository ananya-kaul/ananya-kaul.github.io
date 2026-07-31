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
      <Projects />
      <Writing />
      {/* After the apps and the writing on purpose: by this point a visitor has
          seen the work itself, so the recommendations read as corroboration of
          something they already believe rather than a claim they have to take
          on trust. It also keeps a thin section off the top of the page while
          the count is still low. */}
      <Recommendations />
      <Education />
      <Achievements />
      <Contact />
    </>
  );
}
