"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { Field } from "@/components/shared/field";
import { useUrCampus } from "@/providers/urcampus-provider";

export function NewDenominationPage() {
  const { addDenomination } = useUrCampus();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addDenomination({
      id: name.toLowerCase().replace(/\W+/g, "-"),
      name,
      description,
    });
    toast.success("Denomination added");
    router.push("/admin/denominations");
  };

  return (
    <AppLayout mode="admin">
      <div className="mx-auto max-w-2xl">
        <PageIntro
          eyebrow="Add to the directory"
          title="Create denomination"
          description="Start with the fellowship's official name and a short description students will understand."
        />
        <form onSubmit={handleSubmit} className="space-y-5 border border-border bg-card p-6">
          <Field label="Denomination name">
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Baptist Students' Union"
            />
          </Field>
          <Field label="Description">
            <Textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief, welcoming description"
            />
          </Field>
          <Button>Create denomination</Button>
        </form>
      </div>
    </AppLayout>
  );
}
