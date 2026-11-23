import PromoBanner from "@/components/PromoBanner";
import CampaignFeature from "@/components/Home/CampaignFeature";
import ClientLogos from "@/components/Home/ClientLogos";
import Hero from "@/components/Home/Hero";
import Project from "@/components/Home/Project";
import ProjectProcess from "@/components/Home/ProjectProcess";
import Services from "@/components/Home/Services";
import Team from "@/components/Home/Team";
import { getActivePromotion, isCampaignActive } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function Home() {
  const showCampaign = isCampaignActive();
  const promotion = getActivePromotion();

  return (
    <>
      {promotion && <PromoBanner promotion={promotion} />}
      <Hero promotion={promotion} />
      <ClientLogos />
      <Services />
      {showCampaign && <CampaignFeature />}
      <Project />
      <Team />
      <ProjectProcess />
    </>
  );
}
