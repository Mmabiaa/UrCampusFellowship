import type { ReactNode } from "react";
import { SiteHeader } from "@/components/shared/site-header";
import { Footer } from "@/components/shared/footer";

export function AppLayout({
  mode,
  children,
}: {
  mode: "student" | "head" | "admin";
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader mode={mode} />
      <main className="mx-auto max-w-6xl px-5 py-8 md:py-12 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
