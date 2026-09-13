export type Campus = "Main Campus" | "Essikado";
export type ChapterStatus = "draft" | "coming-soon" | "active";

export interface Denomination {
  id: string;
  name: string;
  description: string;
}

export interface Chapter {
  id: string;
  denominationId: string;
  name: string;
  shortName: string;
  campus: Campus;
  status: ChapterStatus;
  meetingDay?: string;
  meetingTime?: string;
  location?: string;
  description: string;
  whatsapp?: string;
  headEmail?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  campus: Campus;
  program: string;
  hall: string;
  level: string;
  chapterId: string;
  flagged?: boolean;
}

export type Profile = Omit<Student, "id" | "chapterId"> & { chapterId?: string | undefined };
