import SnippetCategoryForm from "@/components/SnippetCategoryForm";
import prisma from "@/lib/prisma";

interface UpdateSnippetCategoryProps {
  params: { slug: string };
}

export default async function UpdateSnippetCategory({
  params,
}: UpdateSnippetCategoryProps) {
  const { slug } = params;
  const category = await prisma.snippetCategory.findFirst({
    where: { slug },
  });

  if (!category) {
    return null;
  }

  return (
    <div>
      <SnippetCategoryForm
        defaultValues={{
          name: category.name,
        }}
        slug={slug}
      />
    </div>
  );
}
