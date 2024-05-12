import { Snippet } from "@prisma/client";
import { handleUpdate } from "./UpdateSnippet.actions";

interface UpdateSnippetParams extends Snippet {
  snippetId: string | number;
}

async function UpdateSnippet(props: UpdateSnippetParams) {
  const { id, title, code } = props;

  return (
    <form className="p-3" action={handleUpdate.bind(null, id)}>
      <div>
        <input
          defaultValue={title}
          name="title"
          type="text"
          className="mb-2 h-10 w-1/2 border-2"
        />
      </div>
      <div>
        <textarea name="code" className="min-h-32 w-1/2 border-2">
          {code}
        </textarea>
      </div>
      <button className="border-2" type="submit">
        Update Snippet
      </button>
    </form>
  );
}

export default UpdateSnippet;
