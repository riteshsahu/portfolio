import SnippetPreview from "@/components/SnippetPreview";
import prisma from "@/lib/prisma";
import React from "react";

export default async function SnippetsPage() {
  const snippets = await prisma.snippet.findMany({
    include: { category: true },
  });

  return (
    <div className="space-y-5 p-4">
      {snippets.map((snippet) => (
        <SnippetPreview key={snippet.id} {...snippet} />
      ))}
    </div>
  );
}
