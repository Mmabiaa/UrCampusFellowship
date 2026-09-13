import { RegisterPage } from "@/components/pages/student/register-page";

export default function Register({ params }: { params: Promise<{ chapterId: string }> }) {
  return <RegisterPage params={params} />;
}
