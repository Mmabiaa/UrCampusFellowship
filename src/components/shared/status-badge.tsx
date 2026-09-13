import type { ChapterStatus } from "@/types";

export function StatusBadge({ status }: { status: ChapterStatus }) {
  const label = status === "coming-soon" ? "Coming soon" : (status[0]?.toUpperCase() ?? "") + status.slice(1);
  return <span className={`status status-${status}`}>{label}</span>;
}
