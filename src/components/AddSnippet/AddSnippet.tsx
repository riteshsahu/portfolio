import prisma from "@/lib/prisma";
import React from "react";

function AddSnippet() {
  async function handleFormSubmit(formData: FormData) {
    "use server";

    const data = {
      title: formData.get("title") as string,
      code: formData.get("code") as string,
      lang: "javascript",
    };

    if (data.title && data.code) {
      await prisma.snippet.create({ data });
    }
  }

  return (
    <form action={handleFormSubmit}>
      <div>
        <input name="title" type="text" className="border-2 mb-2 w-1/2" />
      </div>
      <div>
        <textarea name="code" className="border-2 w-1/2"></textarea>
      </div>
      <button className="border-2" type="submit">
        Add Snippet
      </button>
    </form>
  );
}

export default AddSnippet;
