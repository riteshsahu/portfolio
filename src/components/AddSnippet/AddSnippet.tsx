import { ROUTE_PATH } from "@/constants";
import prisma from "@/lib/prisma";
import { kebabCase } from "lodash";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SnippetForm from "../SnippetForm";
import { getFormData } from "@/utils";
import { Snippet } from "@prisma/client";

function AddSnippet() {
  async function handleFormSubmit(formData: FormData) {
    "use server";

    const data: Snippet = getFormData(formData);

    if (data.title && data.code) {
      await prisma.snippet.create({
        data: {
          ...data,
          slug: kebabCase(data.title),
        },
      });

      revalidatePath(ROUTE_PATH.SNIPPETS);
      redirect(ROUTE_PATH.SNIPPETS);
    }
  }

  return (
    <SnippetForm action={handleFormSubmit}>
      <button className="border-2" type="submit">
        Add Snippet
      </button>
    </SnippetForm>
  );
}

export default AddSnippet;
