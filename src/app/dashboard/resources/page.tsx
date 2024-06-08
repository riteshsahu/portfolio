import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ROUTE_PATH } from "@/constants";
import prisma from "@/lib/prisma";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

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
        <DataTable columns={columns} data={resources} />
      </div>
    </div>
  );
}
