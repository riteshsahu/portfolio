import SnippetForm from "@/components/SnippetForm";
import prisma from "@/lib/prisma";

interface UpdateSnippetPageProps {
  params: { slug: string };
}

async function UpdateSnippetPage({ params }: UpdateSnippetPageProps) {
  const { slug } = params;
  const snippet = await prisma.snippet.findFirst({
    where: { slug },
  });
  const categories = await prisma.snippetCategory.findMany();

  if (!snippet) {
    return;
  }

  return (
    <main className="min-h-screen p-6">
      <SnippetForm defaultValues={snippet as any} categories={categories} />
    </main>
  );
}

export default UpdateSnippetPage;
