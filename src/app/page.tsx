import Hero from "@/components/Home/Hero";
import Project from "@/components/Home/Project";
import Services from "@/components/Home/Services";
import Team from "@/components/Home/Team";
import Testimonial from "@/components/Home/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Services />
      <Project />
      <Team />
      <Testimonial />
    </div>
  );
}
