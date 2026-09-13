"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { useUrCampus } from "@/providers/urcampus-provider";
import type { Campus } from "@/types";

export function CampusPage() {
  const { campus, setCampus } = useUrCampus();
  const router = useRouter();

  return (
    <AppLayout mode="student">
      <div className="mx-auto max-w-3xl">
        <PageIntro
          eyebrow="One quick choice"
          title="Which campus are you on?"
          description="We&apos;ll show fellowships that meet close to you. You can change this anytime."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {(["Main Campus", "Essikado"] as Campus[]).map((name) => (
            <button
              key={name}
              onClick={() => setCampus(name)}
              className={`min-h-48 border p-6 text-left transition ${
                campus === name
                  ? "border-primary bg-secondary"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <MapPin className="size-6 text-clay" />
              <h2 className="mt-8 font-display text-2xl">{name}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {name === "Main Campus"
                  ? "North and South campus communities"
                  : "Fellowships gathering at the Essikado campus"}
              </p>
              {campus === name && (
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  <Check className="size-4" /> Selected
                </span>
              )}
            </button>
          ))}
        </div>
        <Button className="mt-7 w-full sm:w-auto" onClick={() => router.push("/directory")}>
          Show my fellowships <ArrowRight />
        </Button>
      </div>
    </AppLayout>
  );
}
