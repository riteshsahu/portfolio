import SnippetsList from "@/components/SnippetsList";
import { Button } from "@/components/ui/button";
import { ROUTE_PATH } from "@/constants";
import { getAuth } from "@/lib/auth";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const auth = await getAuth();

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
      <SnippetsList />
    </div>
  );
}
