import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Skills />
      <Projects />
    </main>
  );
}
