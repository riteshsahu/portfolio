import SnippetCategoryForm from "@/components/SnippetCategoryForm";
import prisma from "@/lib/prisma";

export default async function UpdateSnippetCategory({ params }) {
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
