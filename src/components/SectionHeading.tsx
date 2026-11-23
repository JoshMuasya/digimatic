export default function SectionHeading({
  id,
  title,
  description,
}: {
  id?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-10">
      <h2 id={id} className="text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}
