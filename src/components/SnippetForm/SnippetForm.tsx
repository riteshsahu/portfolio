import React from "react";
import SnippetEditor from "../SnippetEditor";
import prisma from "@/lib/prisma";

async function SnippetForm({
  action,
  title,
  code,
  lang,
  categoryId,
  ...props
}) {
  const categories = await prisma.snippetCategory.findMany();

  return (
    <form action={action}>
      <div>
        <input
          defaultValue={title}
          name="title"
          type="text"
          className="mb-2 h-10 w-1/2 border-2 text-black"
        />
      </div>
      <select
        required
        defaultValue={categoryId}
        className="mb-3 text-black"
        name="categoryId"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <SnippetEditor code={code} lang={lang} />
      {props.children}
    </form>
  );
}

export default SnippetForm;
