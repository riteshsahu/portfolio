import SnippetForm from "@/components/SnippetForm";
import prisma from "@/lib/prisma";

export default async function AddSnippetPage() {
  const categories = await prisma.snippetCategory.findMany();

  return (
    <div className="h-full p-6 pb-0">
      <SnippetForm categories={categories} />
    </div>
  );
}
