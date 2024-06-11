import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTE_PATH } from "@/constants";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  const snippetsCount = await prisma.snippet.count();
  const snippetCategoryCount = await prisma.snippetCategory.count();
  const resourcesCount = await prisma.resource.count();
  const resourceCategoryCount = await prisma.resourceCategory.count();

  return (
    <div className="mx-auto grid w-full max-w-[800px] grid-cols-1 gap-10 sm:grid-cols-2">
      <Card className="" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <Link href={ROUTE_PATH.SNIPPETS}>
            <CardTitle>Snippets</CardTitle>
          </Link>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            {snippetsCount}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={ROUTE_PATH.ADD_SNIPPET}>Add Snippet</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className="" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <Link href={ROUTE_PATH.SNIPPETS_CATEGORIES}>
            <CardTitle>Snippet Categories</CardTitle>
          </Link>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            {snippetCategoryCount}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={ROUTE_PATH.ADD_SNIPPET_CATEGORY}>Add Category</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className="" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <Link href={ROUTE_PATH.RESOURCES}>
            <CardTitle>Resources</CardTitle>
          </Link>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            {resourcesCount}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={ROUTE_PATH.ADD_SNIPPET_CATEGORY}>Add Resource</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className="" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <Link href={ROUTE_PATH.RESOURCES_CATEGORIES}>
            <CardTitle>Resource Categories</CardTitle>
          </Link>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            {resourceCategoryCount}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={ROUTE_PATH.ADD_SNIPPET_CATEGORY}>Add Category</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
