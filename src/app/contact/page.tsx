import type { Metadata } from "next";
import Contact from "@/components/Contact/Contact";
import Hero from "@/components/Contact/Hero";
import { campaign, isCampaignActive, projectPackages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project or get in touch with Digimatic Marketers in Nairobi, Kenya.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string | string[] }>;
}) {
  const { package: packageId } = await searchParams;
  const knownPackage = typeof packageId === "string" && Object.hasOwn(projectPackages, packageId);
  const isAvailable = packageId !== campaign.packageId || isCampaignActive();
  const packageName = knownPackage && isAvailable
    ? projectPackages[packageId as keyof typeof projectPackages]
    : undefined;

  return (
    <>
      <Hero />
      <Contact key={packageName} packageName={packageName} />
    </>
  );
}
