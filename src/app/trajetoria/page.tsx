import { SpacePage } from "@/components/space-page";
import { Experience } from "@/sections/experience";
import { Education } from "@/sections/education";

export default function JourneyPage() {
  return (
    <SpacePage space="journey" number="02">
      <Experience />
      <Education />
    </SpacePage>
  );
}
