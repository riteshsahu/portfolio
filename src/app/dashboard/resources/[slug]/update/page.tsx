import ResourceForm from "@/components/ResourceForm";
import prisma from "@/lib/prisma";
import React from "react";

export default async function UpdateResource({ params }) {
  const { slug } = params;
  const resource = await prisma.resource.findFirst({
    where: { slug },
  });

  const categories = await prisma.resourceCategory.findMany();

  if (!resource) {
    return null;
  }

  return (
    <div className="my-auto flex flex-col items-center justify-center">
      <ResourceForm
        categories={categories}
        defaultValues={resource}
        slug={slug}
      />
    </div>
  );
}
