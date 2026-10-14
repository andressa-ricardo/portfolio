import { SpacePage } from "@/components/space-page";
import { About } from "@/sections/about";
import { Services } from "@/sections/services";

export default function AboutPage() {
  return (
    <SpacePage space="about" number="01">
      <About />
      <Services />
    </SpacePage>
  );
}
