import ResourceForm from "@/components/ResourceForm";
import prisma from "@/lib/prisma";

interface UpdateResourceProps {
  params: {
    slug: string;
  };
}

export default async function UpdateResource({ params }: UpdateResourceProps) {
  const { slug } = params;
  const resource = await prisma.resource.findFirst({
    where: { slug },
  });

  const categories = await prisma.resourceCategory.findMany();

  if (!resource) {
    return null;
  }

  return (
    <div className="my-auto flex flex-col items-center justify-center pb-5">
      <ResourceForm
        categories={categories}
        defaultValues={resource as any}
        slug={slug}
      />
    </div>
  );
}
