import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";
import type { ReactNode } from "react";

function Brand() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="UrCampusFellowship home">
      <span className="grid size-9 place-items-center border border-primary/25 bg-primary text-primary-foreground">
        <Leaf className="size-4" />
      </span>
      <span>
        <strong className="block font-display text-[1.04rem] leading-none text-foreground">
          UrCampus
        </strong>
        <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Fellowship
        </span>
      </span>
    </Link>
  );
}

export function AuthLayout({
  title,
  description,
  children,
  back = "/",
}: {
  title: string;
  description: string;
  children: ReactNode;
  back?: "/" | "/login" | "/signup";
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6 lg:px-8">
        <Brand />
        <div className="grid flex-1 place-items-center py-10">
          <div className="w-full max-w-md">
            <Link
              href={back}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back
            </Link>
            <div className="border-t-4 border-primary bg-card p-6 shadow-soft sm:p-9">
              <p className="eyebrow">UrCampusFellowship</p>
              <h1 className="mt-3 font-display text-4xl leading-tight">{title}</h1>
              <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
              <div className="mt-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
