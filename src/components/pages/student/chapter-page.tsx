"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowRight, Bell, CalendarDays, Clock3, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layouts/app-layout";
import { StatusBadge } from "@/components/shared/status-badge";
import { useUrCampus } from "@/providers/urcampus-provider";

export function ChapterPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = use(params);
  const { chapters } = useUrCampus();
  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return (
      <AppLayout mode="student">
        <h1 className="font-display text-4xl">Chapter not found</h1>
        <Button asChild className="mt-4">
          <Link href="/directory">Back to directory</Link>
        </Button>
      </AppLayout>
    );
  }

  const coming = chapter.status !== "active";

  return (
    <AppLayout mode="student">
      <Link
        href="/directory"
        className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground"
      >
        <ArrowRight className="size-4 rotate-180" /> All fellowships
      </Link>
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <StatusBadge status={chapter.status} />
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-tight md:text-6xl">
            {chapter.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {chapter.description}
          </p>
          {coming ? (
            <div className="mt-10 border-l-4 border-gold bg-card p-6">
              <Bell className="size-7 text-clay" />
              <h2 className="mt-4 font-display text-2xl">This community is getting ready</h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                Meeting details and the WhatsApp group will appear here as soon as the chapter head
                completes setup.
              </p>
              <Button
                className="mt-6"
                onClick={() => toast.success("We&apos;ll let you know when this chapter is ready")}
              >
                Notify me
              </Button>
            </div>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="border-t-2 border-primary bg-card p-5">
                <CalendarDays className="size-5 text-clay" />
                <p className="mt-4 text-xs font-bold uppercase text-muted-foreground">Day</p>
                <p className="mt-1 font-bold">{chapter.meetingDay}</p>
              </div>
              <div className="border-t-2 border-primary bg-card p-5">
                <Clock3 className="size-5 text-clay" />
                <p className="mt-4 text-xs font-bold uppercase text-muted-foreground">Time</p>
                <p className="mt-1 font-bold">{chapter.meetingTime}</p>
              </div>
              <div className="border-t-2 border-primary bg-card p-5">
                <MapPin className="size-5 text-clay" />
                <p className="mt-4 text-xs font-bold uppercase text-muted-foreground">Place</p>
                <p className="mt-1 font-bold">{chapter.location}</p>
              </div>
            </div>
          )}
        </div>
        <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-24">
          <p className="eyebrow">{coming ? "Stay close" : "You&apos;re welcome here"}</p>
          <h2 className="mt-3 font-display text-2xl">
            {coming ? "Hear when it opens" : "Ready to join?"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {coming
              ? "One tap is all it takes. We&apos;ll remember your interest."
              : "Share a few details with the chapter, then join their WhatsApp group."}
          </p>
          {coming ? (
            <Button
              className="mt-6 w-full"
              onClick={() => toast.success("You&apos;re on the notification list")}
            >
              <Bell /> Notify me
            </Button>
          ) : (
            <Button asChild className="mt-6 w-full">
              <Link href={`/chapters/${chapter.id}/register`}>
                Register to join <ArrowRight />
              </Link>
            </Button>
          )}
        </aside>
      </div>
    </AppLayout>
  );
}
