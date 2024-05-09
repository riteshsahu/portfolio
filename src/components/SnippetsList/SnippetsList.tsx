import prisma from "@/lib/prisma";
import SnippetPreview from "../SnippetPreview";

async function SnippetsList() {
  const snippets = await prisma.snippet.findMany();
  return (
    <div>
      {snippets.map((snippet) => (
        <SnippetPreview key={snippet.id} {...snippet} code={snippet.body} />
      ))}
    </div>
  );
}

export default SnippetsList;
