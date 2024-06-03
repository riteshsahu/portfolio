import EntityActions from "@/components/EntityActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTE_PATH } from "@/constants";
import { getRoutePath } from "@/helpers/route.helpers";
import { deleteResourceCategory } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function ResourceCategories() {
  const categories = await prisma.resourceCategory.findMany();

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <Button asChild>
          <Link href={ROUTE_PATH.ADD_RESOURCE_CATEGORY}>
            <PlusCircle className="mr-2" size={20} />
            Add
          </Link>
        </Button>
      </div>
      <div>
        {categories.map((category) => (
          <Card className="mb-3" key={category.id}>
            <CardContent className="flex items-start justify-between p-3">
              <Link
                href={getRoutePath(ROUTE_PATH.VIEW_RESOURCE_CATEGORY, {
                  slug: category.slug,
                })}
              >
                <div>{category.name}</div>
              </Link>
              <div className="flex items-center gap-3">
                <EntityActions
                  config={{
                    update: {
                      path: getRoutePath(ROUTE_PATH.UPDATE_RESOURCE_CATEGORY, {
                        slug: category.slug,
                      }),
                    },
                    delete: {
                      action: deleteResourceCategory.bind(null, category.id),
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
