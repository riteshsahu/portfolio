import ResourcesFilter from "@/components/ResourcesFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface ResourcesPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const category = searchParams["category"];
  const searchQuery = searchParams["q"];
  const query: any = {};

  if (typeof category === "string") {
    query.category = {
      slug: category,
    };
  }

  const resources = await prisma.resource.findMany({
    where: { ...query },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const categoriesPromise = prisma.resourceCategory.findMany();

  return (
    <div className="p-4">
      <div className="mb-5">
        <ResourcesFilter categoriesPromise={categoriesPromise} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resources
          .filter((resource) => {
            if (typeof searchQuery === "string" && searchQuery.length) {
              return (
                resource.category?.name?.includes(searchQuery) ||
                resource.name?.includes(searchQuery) ||
                resource.title?.includes(searchQuery) ||
                resource.description?.includes(searchQuery)
              );
            }
            return true;
          })
          .map((resource) => (
            <Link
              key={resource.id}
              href={resource.url as any}
              prefetch={false}
              passHref={true}
              target="_blank"
            >
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-start gap-5">
                    <Avatar className="mt-1 h-9 w-9">
                      {resource.icon && <AvatarImage src={resource.icon} />}
                      <AvatarFallback className="text-sm">CC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="flex items-center justify-between text-xl">
                        <div className="line-clamp-1">{resource.name}</div>
                        <Badge
                          className="absolute right-0 top-0 rounded-none rounded-bl-md"
                          variant="secondary"
                        >
                          {resource.category?.name}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="line-clamp-1 h-[calc(1.5em_*_1)] leading-normal">
                        {resource.title}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 leading-normal sm:h-[calc(1.5em_*_3)]">
                    {resource.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
