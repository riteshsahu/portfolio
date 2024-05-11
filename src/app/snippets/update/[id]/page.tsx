import UpdateSnippet from "@/components/UpdateSnippet";

interface UpdateSnippetPageProps {
  params: { id: number };
}

export default function UpdateSnippetPage({ params }: UpdateSnippetPageProps) {
  const { id } = params;

  return (
    <div>
      <UpdateSnippet snippetId={id} />
    </div>
  );
}
