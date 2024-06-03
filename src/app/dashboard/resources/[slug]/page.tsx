import prisma from "@/lib/prisma";
import React from "react";

export default async function ResourceDetail({ params }) {
  const { slug } = params;
  const resource = await prisma.resource.findFirst({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!resource) {
    return null;
  }

  return (
    <div>
      <div>Name: {resource.name}</div>
      <div>Category: {resource.category?.name}</div>
    </div>
  );
}
