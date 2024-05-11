"use server";

import { ROUTE_PATH } from "@/constants";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function handleDelete(id: string) {
  await prisma.snippet.delete({
    where: { id },
  });
  revalidatePath(ROUTE_PATH.SNIPPETS);
}
