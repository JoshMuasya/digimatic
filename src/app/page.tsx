import Hero from "@/components/Home/Hero";
import Project from "@/components/Home/Project";
import Services from "@/components/Home/Services";
import Team from "@/components/Home/Team";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Services />
      <Project />
      <Team />
    </div>
  );
}
