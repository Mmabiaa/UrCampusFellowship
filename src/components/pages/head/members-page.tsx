"use client";

import { useState } from "react";
import { Search, Flag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageIntro } from "@/components/shared/page-intro";
import { useUrCampus } from "@/providers/urcampus-provider";

export function HeadMembersPage() {
  const { students, removeStudent, toggleFlag } = useUrCampus();
  const [query, setQuery] = useState("");
  const members = students.filter(
    (s) => s.chapterId === "pensa-main" && s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppLayout mode="head">
      <PageIntro
        eyebrow="PENSA · Main Campus"
        title="Member roster"
        description={`${members.length} students are currently part of your chapter.`}
      />
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
        <Input
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search members"
        />
      </div>
      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-muted text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Programme</th>
              <th className="p-4">Level</th>
              <th className="p-4">Contact</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((student) => (
              <tr key={student.id} className="border-t border-border">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center bg-secondary font-bold text-primary">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <span>
                      <strong className="block">{student.name}</strong>
                      {student.flagged && (
                        <span className="text-xs font-bold text-clay">Flagged for review</span>
                      )}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm">{student.program}</td>
                <td className="p-4 text-sm">{student.level}</td>
                <td className="p-4 text-sm text-muted-foreground">{student.phone}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Flag ${student.name}`}
                      onClick={() => toggleFlag(student.id)}
                    >
                      <Flag className={student.flagged ? "fill-clay text-clay" : ""} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${student.name}`}
                      onClick={() => {
                        removeStudent(student.id);
                        toast("Member removed");
                      }}
                    >
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
