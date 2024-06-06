import SnippetForm from "@/components/SnippetForm";
import prisma from "@/lib/prisma";

export default async function AddSnippetPage() {
  const categories = await prisma.snippetCategory.findMany();

  return (
    <main className="min-h-screen p-6">
      <SnippetForm categories={categories} />
    </main>
  );
}
