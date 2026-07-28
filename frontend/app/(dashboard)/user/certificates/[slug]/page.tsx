import CertificateClient from "./CertificateClient";

type CertificatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata = {
  title: "Certificate - EduFlow",
};

export default async function CertificatePage({ params }: CertificatePageProps) {
  const { slug } = await params;
  return <CertificateClient slug={slug} />;
}
