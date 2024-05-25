import UpdateSnippet from "@/components/UpdateSnippet";
import prisma from "@/lib/prisma";

interface UpdateSnippetPageProps {
  params: { slug: string };
}

async function UpdateSnippetPage({ params }: UpdateSnippetPageProps) {
  const { slug } = params;
  const snippet = await prisma.snippet.findFirst({
    where: { slug },
  });

  if (!snippet) {
    return;
  }

  return (
    <div>
      <UpdateSnippet {...snippet} />
    </div>
  );
}

export default UpdateSnippetPage;
