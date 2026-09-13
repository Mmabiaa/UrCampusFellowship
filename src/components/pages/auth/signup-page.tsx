"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Field } from "@/components/shared/field";
import { useUrCampus } from "@/providers/urcampus-provider";

export function SignupPage() {
  const { email, setEmail } = useUrCampus();
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/verify");
  };

  return (
    <AuthLayout
      title="Start with your student email"
      description="We'll send a short code to make sure it's really you."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="University email">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@stu.ucc.edu.gh"
          />
        </Field>
        <Button className="w-full" type="submit">
          Send my code <ArrowRight />
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already started?{" "}
          <Link href="/directory" className="font-bold text-primary">
            Browse fellowships
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
