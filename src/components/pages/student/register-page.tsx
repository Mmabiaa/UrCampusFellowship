"use client";

import { useState, use, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { Field } from "@/components/shared/field";
import { SelectField } from "@/components/shared/select-field";
import { useUrCampus } from "@/providers/urcampus-provider";
import type { Campus, Student, Chapter } from "@/types";

function DuplicatePage({ chapter }: { chapter?: Chapter | undefined }) {
  return (
    <AppLayout mode="student">
      <div className="mx-auto max-w-xl border-t-4 border-clay bg-card p-7 text-center shadow-soft sm:p-10">
        <div className="mx-auto grid size-14 place-items-center bg-accent text-clay">
          <CircleAlert />
        </div>
        <p className="eyebrow mt-6">One community at a time</p>
        <h1 className="mt-3 font-display text-4xl">You&apos;re already registered</h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Your student email is already connected to{" "}
          <strong className="text-foreground">{chapter?.name ?? "another chapter"}</strong>. Leave
          that chapter from your profile before joining another.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/profile">View my chapter</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/directory">Back to directory</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

export function RegisterPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = use(params);
  const { chapters, students, email, profile, setProfile, addStudent } = useUrCampus();
  const router = useRouter();

  const chapter = chapters.find((c) => c.id === chapterId);
  const duplicate = students.find((s) => s.email.toLowerCase() === email.toLowerCase());
  const [form, setForm] = useState({ ...profile, chapterId });

  if (!chapter) return null;
  if (duplicate) {
    const duplicateChapter = chapters.find((c) => c.id === duplicate.chapterId);
    return <DuplicatePage chapter={duplicateChapter} />;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = { ...form, id: `s${Date.now()}`, chapterId } as Student;
    addStudent(next);
    setProfile(form);
    router.push(`/chapters/${chapterId}/success`);
  };

  return (
    <AppLayout mode="student">
      <div className="mx-auto max-w-2xl">
        <PageIntro
          eyebrow={chapter.name}
          title="A little about you"
          description="These details help your chapter welcome and support you well."
        />
        <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name">
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Phone number">
            <Input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
          <Field label="Campus">
            <SelectField
              value={form.campus}
              onChange={(e) => setForm({ ...form, campus: e.target.value as Campus })}
            >
              <option>Main Campus</option>
              <option>Essikado</option>
            </SelectField>
          </Field>
          <Field label="Programme">
            <Input
              required
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
            />
          </Field>
          <Field label="Hostel or hall">
            <Input
              required
              value={form.hall}
              onChange={(e) => setForm({ ...form, hall: e.target.value })}
            />
          </Field>
          <Field label="Level">
            <SelectField
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option>100</option>
              <option>200</option>
              <option>300</option>
              <option>400</option>
              <option>Postgraduate</option>
            </SelectField>
          </Field>
          <div className="sm:col-span-2">
            <Button className="w-full sm:w-auto">
              Complete registration <ArrowRight />
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
