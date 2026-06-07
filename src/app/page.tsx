import Hero from "@/components/Home/Hero";
import ClientLogos from "@/components/Home/ClientLogos";
import Project from "@/components/Home/Project";
import Services from "@/components/Home/Services";
import Team from "@/components/Home/Team";
import { PopupOnLoad } from "@/components/PopupOnLoad";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PopupOnLoad />
      <Hero />
      <ClientLogos />
      <Services />
      <Project />
      <Team />
    </div>
  );
}
