import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import Hero from "./components/Galaxy/Hero";
import Galaxy from "./components/Galaxy/Galaxy";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/TiltedCard/About";
import Projects from "./components/ProjectCard/Projects";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero with Galaxy Background and Lanyard */}
      <div className="relative">
        <Hero />

        {/* Lanyard overlay - Only in Hero section */}
        <div className="absolute top-0 right-0 w-1/2 h-full z-50 pointer-events-none">
          <div className="pointer-events-auto w-full h-full">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </div>
      </div>

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />
    </div>
  );
}
