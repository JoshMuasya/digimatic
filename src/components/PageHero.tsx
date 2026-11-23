export default function PageHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="site-hero border-b border-border py-16 sm:py-24">
      <div className="site-container">
        <h1 className="max-w-4xl text-4xl leading-[1.07] font-bold tracking-[-0.045em] text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}
