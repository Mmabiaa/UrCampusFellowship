"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { initialChapters, initialDenominations, initialStudents } from "@/lib/data";
import type { Campus, Chapter, Denomination, Student, Profile } from "@/types";

interface AppState {
  campus: Campus;
  setCampus: (campus: Campus) => void;
  email: string;
  setEmail: (email: string) => void;
  profile: Profile;
  setProfile: (profile: Profile) => void;
  denominations: Denomination[];
  addDenomination: (item: Denomination) => void;
  chapters: Chapter[];
  addChapter: (item: Chapter) => void;
  updateChapter: (item: Chapter) => void;
  students: Student[];
  addStudent: (item: Student) => void;
  removeStudent: (id: string) => void;
  toggleFlag: (id: string) => void;
  leaveChapter: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function UrCampusProvider({ children }: { children: ReactNode }) {
  const [campus, setCampus] = useState<Campus>("Main Campus");
  const [email, setEmail] = useState("ama.mensah@stu.ucc.edu.gh");
  const [profile, setProfile] = useState<Profile>({
    name: "Ama Mensah",
    email: "ama.mensah@stu.ucc.edu.gh",
    phone: "024 561 9204",
    campus: "Main Campus",
    program: "BSc Nursing",
    hall: "Adehye Hall",
    level: "200",
    chapterId: "pensa-main",
  });
  const [denominations, setDenominations] = useState(initialDenominations);
  const [chapters, setChapters] = useState(initialChapters);
  const [students, setStudents] = useState(initialStudents);

  const value = useMemo<AppState>(
    () => ({
      campus,
      setCampus,
      email,
      setEmail,
      profile,
      setProfile,
      denominations,
      addDenomination: (item) => setDenominations((all) => [...all, item]),
      chapters,
      addChapter: (item) => setChapters((all) => [...all, item]),
      updateChapter: (item) =>
        setChapters((all) => all.map((chapter) => (chapter.id === item.id ? item : chapter))),
      students,
      addStudent: (item) => setStudents((all) => [...all, item]),
      removeStudent: (id) => setStudents((all) => all.filter((student) => student.id !== id)),
      toggleFlag: (id) =>
        setStudents((all) =>
          all.map((student) =>
            student.id === id ? { ...student, flagged: !student.flagged } : student
          )
        ),
      leaveChapter: () => setProfile((current) => ({ ...current, chapterId: undefined })),
    }),
    [campus, email, profile, denominations, chapters, students]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useUrCampus() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useUrCampus must be used inside UrCampusProvider");
  return value;
}
