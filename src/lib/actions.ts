"use server";

import { ROUTE_PATH } from "@/constants";
import prisma from "@/lib/prisma";
import {
  AddResourceCategoryFormInputs,
  AddResourceFormInputs,
  AddSnippetCategoryFormInputs,
  ServerResponse,
} from "@/lib/types";
import { kebabCase } from "lodash";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* -------------------------------------------------------------------------- */
/*                                  RESOURCE                                  */
/* -------------------------------------------------------------------------- */
export const upsertResource = async (
  values: AddResourceFormInputs,
  options: any,
): Promise<ServerResponse | void> => {
  const { slug } = options;
  const newSlug = kebabCase(values.name);

  await prisma.resource.upsert({
    where: { slug: slug || newSlug },
    create: {
      ...values,
      slug: newSlug,
    },
    update: {
      ...values,
      slug: newSlug,
    },
  });

  const path = ROUTE_PATH.RESOURCES;

  revalidatePath(path);
  redirect(path);
};

export const deleteResource = async (
  id: string,
): Promise<ServerResponse | void> => {
  if (!id) {
    return {
      message: "ID is required!",
      ok: false,
    };
  }

  await prisma.resource.delete({
    where: { id },
  });

  const path = ROUTE_PATH.RESOURCES;

  revalidatePath(path);
};

/* -------------------------------------------------------------------------- */
/*                              RESOURCE CATEGORY                             */
/* -------------------------------------------------------------------------- */
export const upsertResourceCategory = async (
  values: AddResourceCategoryFormInputs,
  options?: any,
): Promise<ServerResponse | void> => {
  const { name } = values;
  const {
    pathToRevalidate = ROUTE_PATH.RESOURCES_CATEGORIES,
    shouldRedirect = false,
    slug,
  } = options;

  const newSlug = kebabCase(name);

  if (!name) {
    return {
      message: "Name is required!",
      ok: false,
    };
  }

  await prisma.resourceCategory.upsert({
    where: { slug: slug || newSlug },
    create: {
      name,
      slug: newSlug,
    },
    update: {
      name,
      slug: newSlug,
    },
  });

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
    shouldRedirect && redirect(pathToRevalidate);
  }
};

export const deleteResourceCategory = async (
  id: string,
): Promise<ServerResponse | void> => {
  if (!id) {
    return {
      message: "ID is required!",
      ok: false,
    };
  }

  await prisma.resourceCategory.delete({
    where: { id },
  });

  const path = ROUTE_PATH.RESOURCES_CATEGORIES;

  revalidatePath(path);
};

/* -------------------------------------------------------------------------- */
/*                                   SNIPPET                                  */
/* -------------------------------------------------------------------------- */
export async function deleteSnippet(id: string) {
  await prisma.snippet.delete({
    where: { id },
  });
  revalidatePath(ROUTE_PATH.SNIPPETS);
}

/* -------------------------------------------------------------------------- */
/*                              SNIPPET CATEGORY                              */
/* -------------------------------------------------------------------------- */
export const deleteSnippetCategory = async (
  id: string,
): Promise<ServerResponse | void> => {
  if (!id) {
    return {
      message: "ID is required!",
      ok: false,
    };
  }

  await prisma.snippetCategory.delete({
    where: { id },
  });

  const path = ROUTE_PATH.SNIPPETS_CATEGORIES;

  revalidatePath(path);
};

export const upsertSnippetCategory = async (
  values: AddSnippetCategoryFormInputs,
  options?: any,
): Promise<ServerResponse | void> => {
  const { name } = values;
  const {
    pathToRevalidate = ROUTE_PATH.SNIPPETS_CATEGORIES,
    shouldRedirect = false,
    slug,
  } = options;

  const newSlug = kebabCase(name);

  if (!name) {
    return {
      message: "Name is required!",
      ok: false,
    };
  }

  await prisma.snippetCategory.upsert({
    where: { slug: slug || newSlug },
    create: {
      name,
      slug: newSlug,
    },
    update: {
      name,
      slug: newSlug,
    },
  });

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
    shouldRedirect && redirect(pathToRevalidate);
  }
};
