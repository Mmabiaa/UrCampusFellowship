"use client";

import { useState, type FormEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { Field } from "@/components/shared/field";
import { StatusBadge } from "@/components/shared/status-badge";
import { useUrCampus } from "@/providers/urcampus-provider";

export function HeadChapterPage() {
  const { chapters, updateChapter } = useUrCampus();
  const chapter = chapters.find((c) => c.id === "pensa-main") ?? chapters[0];
  const [form, setForm] = useState(chapter);

  if (!form) return null;

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const active = Boolean(
      form.meetingDay && form.meetingTime && form.location && form.description && form.whatsapp
    );
    updateChapter({ ...form, status: active ? "active" : "coming-soon" });
    toast.success(active ? "Chapter is active and visible" : "Saved as coming soon");
  };

  return (
    <AppLayout mode="head">
      <PageIntro
        eyebrow="PENSA · Main Campus"
        title="Chapter details"
        description="Keep these details clear and current so students know when and where to find you."
        action={<StatusBadge status={form.status} />}
      />
      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[1fr_19rem]">
        <div className="grid gap-5 border border-border bg-card p-6 sm:grid-cols-2">
          <Field label="Meeting day">
            <Input
              value={form.meetingDay ?? ""}
              onChange={(e) => setForm({ ...form, meetingDay: e.target.value })}
            />
          </Field>
          <Field label="Meeting time">
            <Input
              type="time"
              value={form.meetingTime ?? ""}
              onChange={(e) => setForm({ ...form, meetingTime: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Meeting location">
              <Input
                value={form.location ?? ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="About this chapter">
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field
              label="WhatsApp invite link"
              hint="Adding all required details makes your chapter active."
            >
              <Input
                type="url"
                value={form.whatsapp ?? ""}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Button>Save chapter details</Button>
          </div>
        </div>
        <aside className="h-fit border-l-4 border-gold bg-card p-6">
          <ShieldCheck className="size-6 text-primary" />
          <h2 className="mt-4 font-display text-xl">Before going live</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            <li>Use a permanent WhatsApp invite link.</li>
            <li>Name a place students can find easily.</li>
            <li>Keep the description warm and specific.</li>
          </ul>
        </aside>
      </form>
    </AppLayout>
  );
}
