"use server";

import { ROUTE_PATH } from "@/constants";
import prisma from "@/lib/prisma";
import { getFormData } from "@/utils";
import { Snippet } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleUpdate(id: string, formData: FormData) {
  const data: Snippet = getFormData(formData);

  if (data.title && data.code) {
    await prisma.snippet.update({
      where: { id },
      data,
    });
  }

  revalidatePath(ROUTE_PATH.SNIPPETS);
  redirect(ROUTE_PATH.SNIPPETS);
}
