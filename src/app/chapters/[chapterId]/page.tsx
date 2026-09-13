import { ChapterPage } from "@/components/pages/student/chapter-page";

export default function Chapter({ params }: { params: Promise<{ chapterId: string }> }) {
  return <ChapterPage params={params} />;
}
