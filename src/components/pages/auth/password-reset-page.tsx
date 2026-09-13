"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Field } from "@/components/shared/field";

export function PasswordResetPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AuthLayout
      title={sent ? "Check your email" : "Reset your password"}
      description={
        sent
          ? "We sent you a secure link to choose a new password."
          : "Enter the email connected to your account."
      }
      back="/login"
    >
      {sent ? (
        <div className="text-center">
          <div className="mx-auto grid size-14 place-items-center bg-secondary text-primary">
            <Check />
          </div>
          <Button asChild className="mt-7 w-full">
            <Link href="/new-password">Open reset link</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Email">
            <Input type="email" required />
          </Field>
          <Button className="w-full">Send reset link</Button>
        </form>
      )}
    </AuthLayout>
  );
}
