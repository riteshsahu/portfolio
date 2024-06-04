import prisma from "@/lib/prisma";
import React from "react";

interface ResrouceCategroyDetailProps {
  params: { slug: string };
}

export default async function ResrouceCategroyDetail({
  params,
}: ResrouceCategroyDetailProps) {
  const { slug } = params;
  const category = await prisma.resourceCategory.findFirst({
    where: { slug },
  });

  if (!category) {
    return null;
  }

  return (
    <div>
      <div>{category.name}</div>
    </div>
  );
}
