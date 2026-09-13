"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { Field } from "@/components/shared/field";
import { useUrCampus } from "@/providers/urcampus-provider";

function Meta({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="size-4 text-clay" />
      {children}
    </span>
  );
}

export function ProfilePage() {
  const { profile, setProfile, chapters, leaveChapter } = useUrCampus();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const chapter = chapters.find((c) => c.id === profile.chapterId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setEditing(false);
    toast.success("Your details are up to date");
  };

  return (
    <AppLayout mode="student">
      <PageIntro
        eyebrow="Student profile"
        title={`Hello, ${profile.name.split(" ")[0] || profile.name}`}
        description="Keep your details current and stay connected to your fellowship."
        action={
          <Button variant="outline" onClick={() => setEditing(!editing)}>
            {editing ? "Cancel" : "Edit details"}
          </Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        {editing ? (
          <form
            onSubmit={handleSubmit}
            className="grid gap-5 border border-border bg-card p-6 sm:grid-cols-2"
          >
            <Field label="Full name">
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Programme">
              <Input value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} />
            </Field>
            <Field label="Hall or hostel">
              <Input value={form.hall} onChange={(e) => setForm({ ...form, hall: e.target.value })} />
            </Field>
            <Field label="Level">
              <Input value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
            </Field>
            <div className="sm:col-span-2">
              <Button>Save changes</Button>
            </div>
          </form>
        ) : (
          <div className="border border-border bg-card">
            <dl className="grid sm:grid-cols-2">
              {[
                ["Email", profile.email],
                ["Phone", profile.phone],
                ["Campus", profile.campus],
                ["Programme", profile.program],
                ["Hall / hostel", profile.hall],
                ["Level", profile.level],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-border p-5 sm:even:border-l">
                  <dt className="text-xs font-bold uppercase text-muted-foreground">{k}</dt>
                  <dd className="mt-2 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        <aside className="border-t-4 border-primary bg-card p-6 shadow-soft">
          <p className="eyebrow">Your fellowship</p>
          {chapter ? (
            <>
              <h2 className="mt-3 font-display text-2xl">{chapter.name}</h2>
              <div className="mt-4 space-y-2">
                <Meta icon={CalendarDays}>{chapter.meetingDay}</Meta>
                <br />
                <Meta icon={MapPin}>{chapter.location}</Meta>
              </div>
              <Button asChild className="mt-6 w-full">
                <Link href={`/chapters/${chapter.id}`}>View chapter</Link>
              </Button>
              <button
                onClick={() => {
                  leaveChapter();
                  toast("You have left the chapter");
                }}
                className="mt-5 w-full text-sm font-bold text-destructive"
              >
                Leave chapter
              </button>
            </>
          ) : (
            <>
              <h2 className="mt-3 font-display text-2xl">No chapter yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">Find a community that feels like home.</p>
              <Button asChild className="mt-6 w-full">
                <Link href="/directory">Browse fellowships</Link>
              </Button>
            </>
          )}
        </aside>
      </div>
    </AppLayout>
  );
}
