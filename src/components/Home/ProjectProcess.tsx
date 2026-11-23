import { ChevronDown } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

const steps = [
  { title: "Discover", description: "We agree on your goals, audience and scope." },
  { title: "Design", description: "We map the pages and review the design with you." },
  { title: "Build", description: "We develop the site and refine it against the agreed scope." },
  { title: "Launch", description: "We prepare the site for launch and walk you through the handover." },
];

const faqs = [
  {
    question: "Can you redesign an existing website?",
    answer: "Yes. Share your website and what you want to improve so we can recommend a scope.",
  },
  {
    question: "What should I have ready for our first conversation?",
    answer: "Tell us what your business does, what you want customers to do on the site, and when you’d like to launch.",
  },
  {
    question: "How do you price custom work?",
    answer: "We quote after reviewing the pages, features and integrations your project needs.",
  },
];

export default function ProjectProcess() {
  return (
    <>
      <section aria-labelledby="process-heading" className="border-b border-border py-14 sm:py-20">
        <div className="site-container">
          <SectionHeading id="process-heading" title="From first conversation to launch" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ title, description }) => (
              <li key={title} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-lg font-semibold text-secondary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-labelledby="faq-heading" className="site-container py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="faq-heading" title="Frequently asked questions" />
            <Button asChild variant="outline"><Link href="/contact">Get in Touch</Link></Button>
          </div>
          <div className="space-y-3">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group rounded-xl border border-border bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-4 font-medium [&::-webkit-details-marker]:hidden sm:px-5">
                  {question}
                  <ChevronDown className="size-4 shrink-0 text-secondary group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
