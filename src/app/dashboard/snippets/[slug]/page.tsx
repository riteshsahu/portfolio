import SnippetPreview from "@/components/SnippetPreview";
import prisma from "@/lib/prisma";

interface SnippetDetailProps {
  params: {
    slug: string;
  };
}

export default async function SnippetDetailPage({
  params,
}: SnippetDetailProps) {
  const { slug } = params;
  const snippet = await prisma.snippet.findFirst({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!snippet) {
    return null;
  }

  return (
    <div>
      <SnippetPreview {...snippet} />
    </div>
  );
}
