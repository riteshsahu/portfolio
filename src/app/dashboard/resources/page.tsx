import EntityActions from "@/components/EntityActions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTE_PATH } from "@/constants";
import { getRoutePath } from "@/helpers/route.helpers";
import { deleteResource } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Resources() {
  const resources = await prisma.resource.findMany();

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
          <Card
            className="flex h-16 items-center justify-between p-3"
            key={resource.id}
          >
            <div className="h-full">
              {resource.image && (
                <Image src={resource.image} alt={resource.name} />
              )}
              <Link
                className="h-full"
                href={resource.link as any}
                passHref={true}
                target="_blank"
              >
                {resource.name}
              </Link>
            </div>
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
          </Card>
        ))}
      </div>
    </div>
  );
}
