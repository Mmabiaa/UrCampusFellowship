import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, HeartHandshake, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/shared/site-header";
import { Footer } from "@/components/shared/footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader mode="public" />
      <main>
        <section className="relative isolate min-h-[calc(100vh-68px)] overflow-hidden">
          <Image
            src="/campus-community.jpg"
            alt="University students walking together across a green campus"
            width={1600}
            height={1000}
            className="absolute inset-0 size-full object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative mx-auto flex min-h-[calc(100vh-68px)] max-w-6xl items-end px-5 pb-14 pt-28 lg:px-8 lg:pb-20">
            <div className="max-w-2xl text-primary-foreground">
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.14em] text-secondary">
                Belong, right where you are
              </p>
              <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                Find your campus fellowship.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/85">
                Discover a community that shares your faith, register in a few moments, and step
                straight into the conversation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-gold text-accent-foreground hover:bg-gold/90">
                  <Link href="/signup">
                    I'm a student <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/directory">Browse fellowships</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-card">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3 lg:px-8">
            {[
              [
                Search,
                "Look around",
                "Choose your campus and see the fellowships already gathering there.",
              ],
              [
                HeartHandshake,
                "Find your people",
                "Read meeting details and get a feel for each community before joining.",
              ],
              [
                MessageCircle,
                "Join the conversation",
                "Register once, then open the chapter's WhatsApp group right away.",
              ],
            ].map(([Icon, title, text], i) => (
              <article
                key={String(title)}
                className={i ? "md:border-l md:border-border md:pl-8" : ""}
              >
                {typeof Icon === "function" && <Icon className="size-7 text-primary" />}
                <h2 className="mt-5 font-display text-2xl">{String(title)}</h2>
                <p className="mt-2 leading-7 text-muted-foreground">{String(text)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
