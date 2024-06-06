import EntityActions from "@/components/EntityActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTE_PATH } from "@/constants";
import { getRoutePath } from "@/helpers/route.helpers";
import { deleteResource } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function Resources() {
  const resources = await prisma.resource.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <Button asChild>
          <Link href={ROUTE_PATH.ADD_RESOURCE}>
            <PlusCircle className="mr-2" size={20} />
            Add
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        {resources.map((resource) => (
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
                      <div>{resource.name}</div>
                      <div className="flex items-center gap-3">
                        <EntityActions
                          config={{
                            view: {
                              path: getRoutePath(ROUTE_PATH.VIEW_RESOURCE, {
                                slug: resource.slug,
                              }),
                            },
                            update: {
                              path: getRoutePath(ROUTE_PATH.UPDATE_RESOURCE, {
                                slug: resource.slug,
                              }),
                            },
                            delete: {
                              action: deleteResource.bind(null, resource.id),
                            },
                          }}
                        />
                      </div>
                      <Badge
                        className="absolute right-0 top-0 rounded-none rounded-bl-md"
                        variant="secondary"
                      >
                        {resource.category?.name}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{resource.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{resource.description}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
