import SnippetsList from "@/components/SnippetsList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <Link href={"/snippets/add"}>Add</Link>
      <div className="mb-5" />
      <SnippetsList />
    </main>
  );
}
