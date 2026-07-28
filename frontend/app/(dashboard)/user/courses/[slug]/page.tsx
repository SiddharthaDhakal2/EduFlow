import CourseDetailClient from "./CourseDetailClient";

type CourseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata = {
  title: "Course - EduFlow",
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  return <CourseDetailClient slug={slug} />;
}
