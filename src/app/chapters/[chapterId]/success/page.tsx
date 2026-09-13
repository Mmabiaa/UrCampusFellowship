import { SuccessPage } from "@/components/pages/student/success-page";

export default function Success({ params }: { params: Promise<{ chapterId: string }> }) {
  return <SuccessPage params={params} />;
}
