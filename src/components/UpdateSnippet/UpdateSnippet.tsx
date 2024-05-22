import { Snippet } from "@prisma/client";
import { handleUpdate } from "./UpdateSnippet.actions";
import SnippetForm from "../SnippetForm";

interface UpdateSnippetParams extends Snippet {}

function UpdateSnippet(props: UpdateSnippetParams) {
  const { id } = props;

  return (
    <SnippetForm {...props} action={handleUpdate.bind(null, id)}>
      <button className="mt-3 border-2" type="submit">
        Update Snippet
      </button>
    </SnippetForm>
  );
}

export default UpdateSnippet;
