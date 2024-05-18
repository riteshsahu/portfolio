import { Snippet } from "@prisma/client";
import { handleUpdate } from "./UpdateSnippet.actions";
import SnippetEditor from "../SnippetEditor";

interface UpdateSnippetParams extends Snippet {}

function UpdateSnippet(props: UpdateSnippetParams) {
  const { id, title, code } = props;

  return (
    <form className="p-3" action={handleUpdate.bind(null, id)}>
      <div>
        <input defaultValue={title} name="title" type="text" className="mb-2 h-10 w-1/2 border-2" />
      </div>
      <div>
        <SnippetEditor name="code" code={code} />
      </div>
      <button className="mt-3 border-2" type="submit">
        Update Snippet
      </button>
    </form>
  );
}

export default UpdateSnippet;
