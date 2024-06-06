"use server";
import { JSDOM } from "jsdom";

import { ROUTE_PATH } from "@/constants";
import prisma from "@/lib/prisma";
import {
  AddResourceCategoryFormInputs,
  AddResourceFormInputs,
  AddSnippetCategoryFormInputs,
  AddSnippetFormInputs,
  ServerResponse,
  SiteMetaDataResponse,
} from "@/lib/types";
import { kebabCase } from "lodash";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProtocolToUrl } from "@/utils";

/* -------------------------------------------------------------------------- */
/*                                  RESOURCE                                  */
/* -------------------------------------------------------------------------- */
export const upsertResource = async (
  values: AddResourceFormInputs,
  options: any,
): Promise<ServerResponse | void> => {
  const { slug } = options;
  const newSlug = kebabCase(values.name);
  values.url = addProtocolToUrl(values.url);

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
export const upsertSnippet = async (
  values: AddSnippetFormInputs,
  options: any,
): Promise<ServerResponse | void> => {
  const { slug } = options;
  const newSlug = kebabCase(values.title);

  await prisma.snippet.upsert({
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

  const path = ROUTE_PATH.SNIPPETS;

  revalidatePath(path);
  redirect(path);
};

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

/* -------------------------------------------------------------------------- */
/*                                    OTHER                                   */
/* -------------------------------------------------------------------------- */

export const getSiteMetaData = async (
  pageUrl: string,
): Promise<SiteMetaDataResponse | null> => {
  try {
    const response = await fetch(pageUrl);
    const html = await response.text();

    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const openGraphData: any = {};
    let highestQualityFavicon = "";

    // Get all meta tags with the "og:" prefix
    const metaTags = doc.querySelectorAll('meta[property^="og:"]');

    // Extract the Open Graph data
    metaTags.forEach((metaTag) => {
      const property = metaTag.getAttribute("property")?.replace("og:", "");
      const content = metaTag.getAttribute("content");
      if (property) {
        openGraphData[property] = content;
      }
    });

    const favicons = Array.from(
      doc.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]'),
    );

    if (favicons.length > 0) {
      const baseUrl = new URL(pageUrl).origin;

      highestQualityFavicon = favicons
        .map((link) => ({
          href: new URL(link.getAttribute("href") || "", baseUrl).href,
          size: link.getAttribute("sizes") || "",
        }))
        .sort((a, b) => {
          const aSizeValue =
            a.size
              .split("x")
              .map(Number)
              .sort((a, b) => b - a)[0] || 0;
          const bSizeValue =
            b.size
              .split("x")
              .map(Number)
              .sort((a, b) => b - a)[0] || 0;
          return bSizeValue - aSizeValue;
        })[0].href;

      if (highestQualityFavicon) {
        openGraphData["faviconlink"] = highestQualityFavicon;
      }
    }

    return openGraphData;
  } catch (error) {
    console.error("Error fetching Open Graph data:", error);
    return null;
  }
};
