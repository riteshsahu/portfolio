import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ROUTE_PATH } from "@/constants";
import { getAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const auth = await getAuth();
  const snippets = await prisma.snippet.findMany({
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
      <div className="flex justify-end">
        {auth.user && (
          <Button asChild>
            <Link href={ROUTE_PATH.ADD_SNIPPET}>
              <PlusCircle className="mr-2" size={20} />
              Add
            </Link>
          </Button>
        )}
      </div>
      <div className="mb-5" />
      <div className="space-y-5">
        <DataTable columns={columns} data={snippets} />

        {/* {snippets.map((snippet) => (
          <SnippetPreview showActions={true} key={snippet.id} {...snippet} />
        ))} */}
      </div>
    </div>
  );
}
