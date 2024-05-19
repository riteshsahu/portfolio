import SnippetsList from "@/components/SnippetsList";
import Link from "next/link";
import { getAuth } from "@/lib/auth/server";

export default function Home() {
  const { userId } = getAuth();

  return (
    <main className="min-h-screen p-6">
      {userId && <Link href={"/snippets/add"}>Add</Link>}
      <div className="mb-5" />
      <SnippetsList />
    </main>
  );
}
