import { SpacePage } from "@/components/space-page";
import { Skills } from "@/sections/skills";
import { Courses } from "@/sections/courses";

export default function TechPage() {
  return (
    <SpacePage space="tech" number="04">
      <Skills />
      <Courses />
    </SpacePage>
  );
}
