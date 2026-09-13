"use client";

import { use } from "react";
import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layouts/app-layout";
import { useUrCampus } from "@/providers/urcampus-provider";

export function SuccessPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = use(params);
  const { chapters } = useUrCampus();
  const chapter = chapters.find((c) => c.id === chapterId);

  return (
    <AppLayout mode="student">
      <div className="mx-auto max-w-xl py-8 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-secondary text-primary">
          <Check className="size-9" />
        </div>
        <p className="eyebrow mt-7">You found your community</p>
        <h1 className="mt-3 font-display text-5xl leading-tight">Welcome to {chapter?.shortName}</h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-muted-foreground">
          Your details have reached the chapter. Open the WhatsApp group and say hello.
        </p>
        <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
          <a href={chapter?.whatsapp ?? "https://wa.me"} target="_blank" rel="noreferrer">
            <MessageCircle /> Open WhatsApp group
          </a>
        </Button>
        <p className="mt-5 text-sm text-muted-foreground">
          You can always find this link again in{" "}
          <Link href="/profile" className="font-bold text-primary">
            your profile
          </Link>
          .
        </p>
      </div>
    </AppLayout>
  );
}
