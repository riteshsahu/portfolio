import prisma from "@/lib/prisma";
import SnippetPreview from "../SnippetPreview";

async function SnippetsList() {
  const snippets = await prisma.snippet.findMany({
    include: { category: true },
  });

  return (
    <div className="space-y-5">
      {snippets.map((snippet) => (
        <SnippetPreview key={snippet.id} {...snippet} />
      ))}
    </div>
  );
}

export default SnippetsList;
