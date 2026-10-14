import { SpacePage } from "@/components/space-page";
import { Experience } from "@/sections/experience";
import { Education } from "@/sections/education";
import { Courses } from "@/sections/courses";
import { Languages } from "@/sections/languages-section";

export default function JourneyPage() {
  return (
    <SpacePage space="journey" number="02">
      <Experience />
      <Education />
      <Courses />
      <Languages />
    </SpacePage>
  );
}
