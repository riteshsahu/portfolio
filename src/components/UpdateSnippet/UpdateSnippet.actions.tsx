"use server";

import { ROUTE_PATH } from "@/constants";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleUpdate(id: number, formData: FormData) {
  console.log(id, "idddd");
  const data = {
    title: formData.get("title") as string,
    code: formData.get("code") as string,
  };

  if (data.title && data.code) {
    await prisma.snippet.update({
      where: { id },
      data,
    });
  }

  revalidatePath(ROUTE_PATH.SNIPPETS);
  redirect(ROUTE_PATH.SNIPPETS);
}
