import { Snippet } from "@prisma/client";
import { handleUpdate } from "./UpdateSnippet.actions";
import SnippetForm from "../SnippetForm";
import { Button } from "@/components/ui/button";

interface UpdateSnippetParams extends Snippet {}

function UpdateSnippet(props: UpdateSnippetParams) {
  const { id } = props;

  return (
    <SnippetForm {...props} action={handleUpdate.bind(null, id)}>
      <Button className="mt-3 border-2" type="submit">
        Update Snippet
      </Button>
    </SnippetForm>
  );
}

export default UpdateSnippet;
