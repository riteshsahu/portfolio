import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SNIPPET_EDITOR_THEME } from "@/constants";
import { Snippet } from "@prisma/client";
import { cache } from "react";
import { getHighlighter as shikiGetHighlighter } from "shiki/bundle/web";
import CopySnippetButton from "../CopySnippetButton";
import styles from "./SnippetPreview.module.scss";

interface SnippetPreviewProps extends Snippet {
  showActions?: boolean;
}

async function SnippetPreview({ title, code, lang, id }: SnippetPreviewProps) {
  const highlighter = await getHighlighter(lang, SNIPPET_EDITOR_THEME);

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: SNIPPET_EDITOR_THEME,
  });

  const snippetId = `snippet-${id}`;

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>{title}</div>
      </CardHeader>
      <CardContent>
        <div className="group relative">
          <div
            id={snippetId}
            className={styles.codeContainer}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="absolute right-0 top-0 hidden p-2 group-hover:block">
            <CopySnippetButton className="text-white" snippetId={snippetId} />
          </div>
        </div>
      </CardContent>
    </Card>
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
