import { ROUTE_PATH } from "@/constants";
import { getRoutePath } from "@/helpers/route.helpers";
import { Snippet } from "@prisma/client";
import Link from "next/link";
import { cache } from "react";
import { FiCopy, FiEdit, FiTrash } from "react-icons/fi";
import { getHighlighter as shikiGetHighlighter } from "shiki";
import Button from "../Button";
import SubmitButton from "../SubmitButton";
import { handleDelete } from "./SnippetPreview.actions";
import styles from "./SnippetPreview.module.scss";
import { getAuth } from "@/lib/auth";

interface SnippetPreviewProps extends Snippet {
  theme?: string;
}

async function SnippetPreview({
  title,
  code,
  lang = "js",
  theme = "one-dark-pro",
  id,
  slug,
}: SnippetPreviewProps) {
  const highlighter = await getHighlighter(lang, theme);

  const html = highlighter.codeToHtml(code, {
    lang,
    theme,
  });

  const auth = await getAuth();

  return (
    <div>
      <div>{title}</div>
      <div className="relative">
        <div className={styles.codeContainer} dangerouslySetInnerHTML={{ __html: html }} />
        <div className="absolute right-0 top-0 flex flex-col gap-2 p-2">
          <Button>
            <FiCopy />
          </Button>
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
