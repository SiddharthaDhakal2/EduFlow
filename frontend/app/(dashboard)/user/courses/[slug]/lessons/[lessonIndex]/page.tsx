import LessonDetailClient from "./LessonDetailClient";

type LessonDetailPageProps = {
  params: Promise<{
    slug: string;
    lessonIndex: string;
  }>;
};

export const metadata = {
  title: "Lesson - EduFlow",
};

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  const { slug, lessonIndex } = await params;
  return <LessonDetailClient slug={slug} lessonIndex={Number(lessonIndex)} />;
}
