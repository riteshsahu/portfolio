import prisma from "@/lib/prisma";
import SnippetPreview from "../SnippetPreview";

async function SnippetsList() {
  const snippets = await prisma.snippet.findMany({
    include: { category: true },
  });
  console.log("🚀 ~ SnippetsList ~ snippets:", snippets[0]);

  return (
    <div>
      {snippets.map((snippet) => (
        <SnippetPreview key={snippet.id} {...snippet} />
      ))}
    </div>
  );
}

export default SnippetsList;
