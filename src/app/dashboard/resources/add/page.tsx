import ResourceForm from "@/components/ResourceForm";
import prisma from "@/lib/prisma";

export default async function AddResource() {
  const categories = await prisma.resourceCategory.findMany();

  return (
    <div className="my-auto flex flex-col items-center justify-center pt-5">
      <ResourceForm categories={categories} />
    </div>
  );
}
