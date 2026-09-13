import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 border-b border-border pb-7 md:flex-row md:items-end">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-4xl leading-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
