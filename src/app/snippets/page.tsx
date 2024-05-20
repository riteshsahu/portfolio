import SnippetsList from "@/components/SnippetsList";
import Link from "next/link";
import { getAuth } from "@/lib/auth";

export default async function Home() {
  const auth = await getAuth();

  return (
    <main className="min-h-screen p-6">
      {auth.user && <Link href={"/snippets/add"}>Add</Link>}
      <div className="mb-5" />
      <SnippetsList />
    </main>
  );
}
