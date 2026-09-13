"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { useUrCampus } from "@/providers/urcampus-provider";

export function DenominationsPage() {
  const { denominations, chapters } = useUrCampus();

  return (
    <AppLayout mode="admin">
      <PageIntro
        eyebrow="Directory structure"
        title="Denominations"
        description="The fellowship bodies represented across UrCampusFellowship."
        action={
          <Button asChild>
            <Link href="/admin/denominations/new">
              <Plus /> Add denomination
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {denominations.map((item) => {
          const related = chapters.filter((c) => c.denominationId === item.id);
          return (
            <article key={item.id} className="border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-5">
                <h2 className="font-display text-2xl">{item.name}</h2>
                <span className="shrink-0 text-sm font-bold text-primary">
                  {related.length} {related.length === 1 ? "chapter" : "chapters"}
                </span>
              </div>
              <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {related.map((c) => (
                  <span
                    key={c.id}
                    className="border border-border bg-muted px-2 py-1 text-xs font-semibold"
                  >
                    {c.campus}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </AppLayout>
  );
}
