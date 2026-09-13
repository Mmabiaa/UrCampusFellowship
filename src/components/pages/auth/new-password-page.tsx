"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Field } from "@/components/shared/field";

export function NewPasswordPage() {
  const router = useRouter();
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (a !== b) {
      toast.error("The passwords do not match");
      return;
    }
    toast.success("Password updated");
    router.push("/login");
  };

  return (
    <AuthLayout
      title="Choose a new password"
      description="Use at least eight characters you don&apos;t use elsewhere."
      back="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="New password">
          <Input
            type="password"
            minLength={8}
            required
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </Field>
        <Field label="Confirm password">
          <Input
            type="password"
            minLength={8}
            required
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </Field>
        <Button className="w-full">Save new password</Button>
      </form>
    </AuthLayout>
  );
}
