import prisma from "@/lib/prisma";
import React from "react";

async function SnippetsList() {
  const snippets = await prisma.snippet.findMany();
  return (
    <div>
      {snippets.map((snippet) => (
        <div key={snippet.id}>
          <div>{snippet.title}</div>
          <div>{snippet.body}</div>
        </div>
      ))}
    </div>
  );
}

export default SnippetsList;
