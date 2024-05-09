import { Snippet } from "@prisma/client";
import { getHighlighter as shikiGetHighlighter } from "shiki";
import { cache } from "react";
import styles from "./SnippetPreview.module.scss";

interface SnippetPreviewProps extends Snippet {
  code: string;
  lang?: string;
  theme?: string;
}

async function SnippetPreview({
  title,
  code,
  lang = "js",
  theme = "one-dark-pro",
}: SnippetPreviewProps) {
  const highlighter = await getHighlighter(lang, theme);

  const html = highlighter.codeToHtml(code, {
    lang,
    theme,
  });

  return (
    <div>
      <div>{title}</div>
      <div
        className={styles.codeContainer}
        dangerouslySetInnerHTML={{ __html: html }}
      />
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
