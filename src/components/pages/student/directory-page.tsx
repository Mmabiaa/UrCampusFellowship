"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { SelectField } from "@/components/shared/select-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { useUrCampus } from "@/providers/urcampus-provider";
import type { Campus } from "@/types";

export function DirectoryPage() {
  const { campus, setCampus, chapters } = useUrCampus();
  const [query, setQuery] = useState("");

  const visible = chapters
    .filter(
      (c) =>
        c.campus === campus &&
        c.status !== "draft" &&
        c.name.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <AppLayout mode="student">
      <PageIntro
        eyebrow={campus}
        title="Find your fellowship"
        description="Explore the communities gathering on your campus, then choose the one that feels like home."
        action={
          <div className="w-full md:w-48">
            <SelectField value={campus} onChange={(e) => setCampus(e.target.value as Campus)}>
              <option>Main Campus</option>
              <option>Essikado</option>
            </SelectField>
          </div>
        }
      />
      <div className="relative mb-7 max-w-lg">
        <Search className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
        <Input
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by fellowship name"
        />
      </div>
      {visible.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/chapters/${chapter.id}`}
              className="group flex min-h-60 flex-col border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`grid size-12 place-items-center font-display text-lg font-bold ${
                    index % 3 === 0
                      ? "bg-secondary text-primary"
                      : index % 3 === 1
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-clay"
                  }`}
                >
                  {chapter.shortName.slice(0, 2)}
                </div>
                <StatusBadge status={chapter.status} />
              </div>
              <h2 className="mt-7 font-display text-2xl">{chapter.name}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {chapter.description}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm font-bold text-primary">
                  {chapter.status === "active" ? chapter.meetingDay : "Details on the way"}
                </span>
                <ArrowRight className="size-4 text-primary transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-border bg-card p-10 text-center">
          <Search className="mx-auto size-7 text-muted-foreground" />
          <h2 className="mt-4 font-display text-2xl">No fellowships found</h2>
          <p className="mt-2 text-muted-foreground">Try a shorter name or browse another campus.</p>
        </div>
      )}
    </AppLayout>
  );
}
