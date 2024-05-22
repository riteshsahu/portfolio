import { ROUTE_PATH, SNIPPET_EDITOR_THEME } from "@/constants";
import { getRoutePath } from "@/helpers/route.helpers";
import { Snippet } from "@prisma/client";
import Link from "next/link";
import { cache } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { getHighlighter as shikiGetHighlighter } from "shiki/bundle/web";
import SubmitButton from "../SubmitButton";
import { handleDelete } from "./SnippetPreview.actions";
import styles from "./SnippetPreview.module.scss";
import { getAuth } from "@/lib/auth";
import CopySnippetButton from "../CopySnippetButton";

interface SnippetPreviewProps extends Snippet {}

async function SnippetPreview({ title, code, lang = "js", id, slug }: SnippetPreviewProps) {
  const highlighter = await getHighlighter(lang, SNIPPET_EDITOR_THEME);

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: SNIPPET_EDITOR_THEME,
  });

  const auth = await getAuth();
  const snippetId = `snippet-${id}`;

  return (
    <div>
      <div>{title}</div>
      <div className="relative">
        <div
          id={snippetId}
          className={styles.codeContainer}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="absolute right-0 top-0 flex flex-col gap-2 p-2">
          <CopySnippetButton snippetId={snippetId} />
          {auth.user && (
            <>
              <Link href={getRoutePath(ROUTE_PATH.UPDATE_SNIPPET, { slug })}>
                <FiEdit color="white" />
              </Link>
              <form action={handleDelete.bind(null, id)}>
                <SubmitButton>
                  <FiTrash />
                </SubmitButton>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const highlighterPromise = shikiGetHighlighter({
  themes: [],
  langs: [],
});

const getHighlighter = cache(async (language: string, theme: string) => {
  const highlighter = await highlighterPromise;
  const loadedLanguages = highlighter.getLoadedLanguages();
  const loadedThemes = highlighter.getLoadedThemes();

  let promises = [];
  if (!loadedLanguages.includes(language as any)) {
    promises.push(highlighter.loadLanguage(language as any));
  }

  if (!loadedThemes.includes(theme as any)) {
    promises.push(highlighter.loadTheme(theme as any));
  }

  await Promise.all(promises);

  return highlighter;
});

export default SnippetPreview;
