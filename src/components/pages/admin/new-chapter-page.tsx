"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { Field } from "@/components/shared/field";
import { SelectField } from "@/components/shared/select-field";
import { useUrCampus } from "@/providers/urcampus-provider";
import type { Campus } from "@/types";

export function NewChapterPage() {
  const { denominations, addChapter } = useUrCampus();
  const router = useRouter();
  const [denominationId, setDenominationId] = useState(denominations[0]?.id ?? "");
  const [campus, setCampus] = useState<Campus>("Main Campus");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = `${denominationId}-${campus.toLowerCase().replace(" ", "-")}-${Date.now()}`;
    addChapter({
      id,
      denominationId,
      name,
      shortName: name.split(" ")[0] || name,
      campus,
      status: "draft",
      description: "This chapter is preparing its campus presence.",
      headEmail: email,
    });
    toast.success("Chapter created");
    router.push("/admin");
  };

  return (
    <AppLayout mode="admin">
      <div className="mx-auto max-w-2xl">
        <PageIntro
          eyebrow="Expand the directory"
          title="Create chapter"
          description="New chapters begin as drafts and stay hidden from students until their details are ready."
        />
        <form onSubmit={handleSubmit} className="space-y-5 border border-border bg-card p-6">
          <Field label="Denomination">
            <SelectField
              value={denominationId}
              onChange={(e) => setDenominationId(e.target.value)}
            >
              {denominations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </SelectField>
          </Field>
          <Field label="Chapter name">
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. PENSA UCC"
            />
          </Field>
          <Field label="Campus">
            <SelectField value={campus} onChange={(e) => setCampus(e.target.value as Campus)}>
              <option>Main Campus</option>
              <option>Essikado</option>
            </SelectField>
          </Field>
          <Field label="Chapter head email">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="head@chapter.edu.gh"
            />
          </Field>
          <Button>Create chapter</Button>
        </form>
      </div>
    </AppLayout>
  );
}
