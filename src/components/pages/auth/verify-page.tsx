"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Field } from "@/components/shared/field";
import { useUrCampus } from "@/providers/urcampus-provider";

export function VerifyPage() {
  const { email } = useUrCampus();
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/campus");
  };

  return (
    <AuthLayout
      title="Check your inbox"
      description={`Enter the 6-digit code sent to ${email || "your email"}.`}
      back="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Verification code">
          <Input
            inputMode="numeric"
            maxLength={6}
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="h-14 text-center text-2xl font-bold tracking-[0.35em]"
          />
        </Field>
        <Button className="w-full" type="submit">
          Verify email
        </Button>
        <button
          type="button"
          onClick={() => toast.success("A fresh code is on its way")}
          className="w-full text-sm font-bold text-primary"
        >
          Send another code
        </button>
      </form>
    </AuthLayout>
  );
}
