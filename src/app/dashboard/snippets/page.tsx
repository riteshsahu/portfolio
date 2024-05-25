import SnippetsList from "@/components/SnippetsList";
import Link from "next/link";
import { getAuth } from "@/lib/auth";
import { ROUTE_PATH } from "@/constants";

export default async function Home() {
  const auth = await getAuth();

  return (
    <div>
      {auth.user && <Link href={ROUTE_PATH.ADD_SNIPPET}>Add</Link>}
      <div className="mb-5" />
      <SnippetsList />
    </div>
  );
}
