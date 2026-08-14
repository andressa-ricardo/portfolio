"use client";

import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Services } from "@/sections/services";
import { Experience } from "@/sections/experience";
import { Projects } from "@/sections/projects";
import { Skills } from "@/sections/skills";
import { Education } from "@/sections/education";
import { Courses } from "@/sections/courses";
import { Languages } from "@/sections/languages-section";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Courses />
      <Languages />
      <Contact />
    </main>
  );
}
