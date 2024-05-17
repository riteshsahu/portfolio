import SnippetsList from "@/components/SnippetsList";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const { userId } = auth();

  return (
    <main className="min-h-screen p-6">
      {userId && <Link href={"/snippets/add"}>Add</Link>}
      <div className="mb-5" />
      <SnippetsList />
    </main>
  );
}
