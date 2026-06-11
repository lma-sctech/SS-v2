type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, title, body, tone = "light" }: SectionHeadingProps) {
  const titleClass = tone === "dark" ? "text-white" : "text-navy";
  const bodyClass = tone === "dark" ? "text-white" : "text-slate";

  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">{eyebrow}</p> : null}
      <h2 className={`mt-3 text-3xl font-bold tracking-normal sm:text-4xl ${titleClass}`}>{title}</h2>
      {body ? <p className={`mt-4 text-base leading-7 ${bodyClass}`}>{body}</p> : null}
    </div>
  );
}
