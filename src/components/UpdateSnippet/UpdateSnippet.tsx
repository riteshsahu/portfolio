import React from "react";
import { handleUpdate } from "./UpdateSnippet.actions";
import prisma from "@/lib/prisma";

interface UpdateSnippetParams {
  snippetId: string;
}

async function UpdateSnippet({ snippetId }: UpdateSnippetParams) {
  const snippet = await prisma.snippet.findFirst({
    where: { id: +snippetId },
  });

  if (!snippet) {
    return;
  }

  return (
    <form className="p-3" action={handleUpdate.bind(null, +snippetId)}>
      <div>
        <input
          defaultValue={snippet.title}
          name="title"
          type="text"
          className="border-2 mb-2 w-1/2 h-10"
        />
      </div>
      <div>
        <textarea name="code" className="border-2 w-1/2 min-h-32">
          {snippet.code}
        </textarea>
      </div>
      <button className="border-2" type="submit">
        Update Snippet
      </button>
    </form>
  );
}

export default UpdateSnippet;
