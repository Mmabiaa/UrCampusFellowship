"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { StatusBadge } from "@/components/shared/status-badge";
import { useUrCampus } from "@/providers/urcampus-provider";
import type { Campus, ChapterStatus } from "@/types";

export function AdminOverviewPage() {
  const { chapters, denominations } = useUrCampus();
  const count = (s: ChapterStatus) => chapters.filter((c) => c.status === s).length;

  return (
    <AppLayout mode="admin">
      <PageIntro
        eyebrow="System administration"
        title="Platform overview"
        description="A clear view of every fellowship chapter across campus. Student personal data stays with chapter heads."
        action={
          <Button asChild>
            <Link href="/admin/chapters/new">
              <Plus /> New chapter
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Active", count("active"), "Students can join"],
          ["Coming soon", count("coming-soon"), "Visible, not yet joinable"],
          ["Draft", count("draft"), "Hidden from students"],
        ].map(([label, value, note], i) => (
          <div
            key={String(label)}
            className={`border-t-4 bg-card p-5 ${
              i === 0 ? "border-primary" : i === 1 ? "border-gold" : "border-border"
            }`}
          >
            <p className="text-sm font-bold text-muted-foreground">{label}</p>
            <p className="mt-2 font-display text-4xl">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 space-y-8">
        {(["Main Campus", "Essikado"] as Campus[]).map((campus) => (
          <section key={campus}>
            <h2 className="mb-4 font-display text-2xl">{campus}</h2>
            <div className="overflow-x-auto border border-border bg-card">
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-muted text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="p-4">Chapter</th>
                    <th className="p-4">Denomination</th>
                    <th className="p-4">Chapter head</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {chapters
                    .filter((c) => c.campus === campus)
                    .map((chapter) => (
                      <tr key={chapter.id} className="border-t border-border">
                        <td className="p-4 font-bold">{chapter.name}</td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {denominations.find((d) => d.id === chapter.denominationId)?.name}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {chapter.headEmail || "Not assigned"}
                        </td>
                        <td className="p-4">
                          <StatusBadge status={chapter.status} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </AppLayout>
  );
}
