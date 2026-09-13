"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Field } from "@/components/shared/field";

export function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"head" | "admin">("head");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(role === "head" ? "/head/chapter" : "/admin");
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to care for your chapter or manage the fellowship directory."
    >
      <div className="mb-6 grid grid-cols-2 border border-border bg-muted p-1">
        <button
          onClick={() => setRole("head")}
          className={`h-9 text-sm font-bold ${
            role === "head" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
          }`}
        >
          Chapter head
        </button>
        <button
          onClick={() => setRole("admin")}
          className={`h-9 text-sm font-bold ${
            role === "admin" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
          }`}
        >
          Admin
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email">
          <Input type="email" required placeholder="name@ucc.edu.gh" />
        </Field>
        <Field label="Password">
          <Input type="password" required placeholder="Enter your password" />
        </Field>
        <div className="text-right">
          <Link href="/password-reset" className="text-sm font-bold text-primary">
            Forgot password?
          </Link>
        </div>
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
}
