/* eslint-disable no-unused-vars */
"use client";
import { SNIPPET_DEFAULT_LANGUAGE, SNIPPET_EDITOR_THEME } from "@/constants";
import { useEffect, useRef, useState, useTransition } from "react";
import type {
  BundledLanguage,
  BundledTheme,
  Highlighter,
} from "shiki/bundle/web";
import { getHighlighter } from "shiki/bundle/web";
import styles from "./SnippetEditor.module.scss";
import type { EditorPlugin } from "./plugins";
import { autoload, hookClosingPairs, hookTab } from "./plugins";
import { cn } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function hookScroll(input: HTMLElement, output: HTMLElement) {
  const onScroll = () => {
    output.scrollTo(input.scrollLeft, input.scrollTop);
  };

  input.addEventListener("scroll", onScroll);

  return () => {
    input.removeEventListener("scroll", onScroll);
  };
}

export interface IndentOptions {
  /**
   * The number of spaces a tab is equal to.
   * This setting is overridden based on the file contents when `detectIndentation` is on.
   * Defaults to 4.
   */
  readonly tabSize: number;
  /**
   * Insert spaces when pressing `Tab`.
   * This setting is overridden based on the file contents when `detectIndentation` is on.
   * Defaults to true.
   */
  readonly insertSpaces: boolean;
}

export interface EditorOptions extends IndentOptions {
  /**
   * Control the rendering of line numbers.
   * Defaults to `on`.
   */
  readonly lineNumbers: "on" | "off";
  /**
   * Should the editor be read only.
   * Defaults to false.
   */
  readonly readOnly: boolean;
  readonly name: string;
  readonly language:
    | BundledLanguage
    | "plaintext"
    | "txt"
    | "text"
    | "plain"
    | (string & {});
  readonly theme: BundledTheme | "none" | (string & {});
}

export interface InitOptions
  extends Pick<EditorOptions, "name" | "language" | "theme"> {
  readonly value?: string;
}

export interface UpdateOptions extends Partial<EditorOptions> {}

interface EditorOptionsWithValue extends EditorOptions {
  readonly value: string;
}

interface ShikiCodeFactory {
  create(
    domElement: HTMLElement,
    highlighter: Highlighter,
    options: InitOptions,
  ): ShikiCode;
  withOptions(options: UpdateOptions): ShikiCodeFactory;
  withPlugins(...plugins: readonly EditorPlugin[]): ShikiCodeFactory;
}

export interface ShikiCode {
  readonly input: HTMLTextAreaElement;
  readonly output: HTMLDivElement;
  readonly container: HTMLElement;

  /**
   * The highlighter instance used by the editor.
   */
  readonly highlighter: Highlighter;

  /**
   * The current value of the editor.
   * Setting this value will update the editor and force a re-render.
   */
  value: string;
  forceRender(value?: string): void;

  /**
   * Make sure the theme or language is loaded before calling this method.
   */
  updateOptions(options: UpdateOptions): void;

  addPlugin(plugin: EditorPlugin): void;

  dispose(): void;
}

const defaultOptions = {
  lineNumbers: "on",
  readOnly: false,
  tabSize: 4,
  insertSpaces: true,
} as const;

export function shikiCode(): ShikiCodeFactory {
  const editor_options = { ...defaultOptions };
  const plugin_list: EditorPlugin[] = [];

  return {
    create(
      domElement: HTMLElement,
      highlighter: Highlighter,
      options: InitOptions,
    ): ShikiCode {
      return create(
        domElement,
        highlighter,
        { value: "", ...editor_options, ...options },
        plugin_list,
      );
    },
    withOptions(options: UpdateOptions): ShikiCodeFactory {
      Object.assign(editor_options, options);
      return this;
    },
    withPlugins(...plugins: EditorPlugin[]): ShikiCodeFactory {
      plugin_list.push(...plugins);
      return this;
    },
  };
}

function create(
  domElement: HTMLElement,
  highlighter: Highlighter,
  editor_options: EditorOptionsWithValue,
  plugin_list: EditorPlugin[],
): ShikiCode {
  const doc = domElement.ownerDocument;

  const output = doc.createElement("div");
  const input = doc.createElement("textarea");

  if (editor_options.name) {
    input.name = editor_options.name;
  }

  initIO(input, output);
  initContainer(domElement);

  domElement.append(input);
  domElement.append(output);

  updateIO(input, output, editor_options);
  updateContainer(domElement, highlighter, editor_options.theme);

  if (editor_options.value) {
    input.value = editor_options.value;
  }

  const forceRender = (value = input.value) => {
    render(
      output,
      highlighter,
      value,
      editor_options.language,
      editor_options.theme,
    );
  };

  const onInput = () => {
    forceRender();
  };
  input.addEventListener("input", onInput);

  forceRender();

  const cleanup = [
    () => {
      input.removeEventListener("input", onInput);
    },
    hookScroll(input, output),
    // injectStyle(doc),
  ];

  const editor: ShikiCode = {
    input,
    output,
    container: domElement,

    get value() {
      return input.value;
    },
    set value(code) {
      input.value = code;
      forceRender(code);
    },

    get highlighter() {
      return highlighter;
    },

    forceRender,
    updateOptions(newOptions) {
      if (shouldUpdateIO(editor_options, newOptions)) {
        updateIO(input, output, newOptions);
      }

      if (shouldUpdateContainer(editor_options, newOptions)) {
        updateContainer(domElement, highlighter, newOptions.theme!);
      }

      const should_rerender = shouldRerender(editor_options, newOptions);

      Object.assign(editor_options, newOptions);

      if (should_rerender) {
        forceRender();
      }
    },

    addPlugin(plugin) {
      cleanup.push(plugin(this, editor_options));
    },
    dispose() {
      cleanup.forEach((fn) => fn());
      input.remove();
      output.remove();
    },
  };

  for (const plugin of plugin_list) {
    cleanup.push(plugin(editor, editor_options));
  }

  return editor;
}

function initContainer(container: HTMLElement) {
  container.style.color = "var(--fg)";
  container.style.backgroundColor = "var(--bg)";
  container.style.position = "relative";
}

function shouldUpdateContainer(
  config: EditorOptions,
  newOptions: UpdateOptions,
) {
  return newOptions.theme !== void 0 && newOptions.theme !== config.theme;
}

function updateContainer(
  container: HTMLElement,
  highlighter: Highlighter,
  theme_name: string,
) {
  const theme = highlighter.getTheme(theme_name);
  container.style.setProperty("--fg", theme.fg);
  container.style.setProperty("--bg", theme.bg);
}

function initIO(input: HTMLTextAreaElement, output: HTMLElement) {
  input.setAttribute("autocapitalize", "off");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("autocorrect", "off");
  input.setAttribute("spellcheck", "false");

  input.classList.add("shikicode", styles.editorInput);
  output.classList.add("shikicode", styles.editorOutput);
}

function shouldUpdateIO(config: EditorOptions, newOptions: UpdateOptions) {
  return (
    (newOptions.lineNumbers !== void 0 &&
      newOptions.lineNumbers !== config.lineNumbers) ||
    (newOptions.tabSize !== void 0 && newOptions.tabSize !== config.tabSize) ||
    (newOptions.readOnly !== void 0 && newOptions.readOnly !== config.readOnly)
  );
}

function updateIO(
  input: HTMLTextAreaElement,
  output: HTMLElement,
  options: UpdateOptions,
) {
  switch (options.lineNumbers) {
    case "on": {
      input.classList.add(styles.lineNumbers);
      output.classList.add(styles.lineNumbers);
      break;
    }
    case "off": {
      input.classList.remove(styles.lineNumbers);
      output.classList.remove(styles.lineNumbers);
      break;
    }
  }

  if (options.tabSize !== void 0) {
    input.style.setProperty("--tab-size", options.tabSize.toString());
    output.style.setProperty("--tab-size", options.tabSize.toString());
  }

  if (options.readOnly !== void 0) {
    input.readOnly = options.readOnly;
  }
}

function render(
  output: HTMLElement,
  highlighter: Highlighter,
  value: string,
  lang: string,
  theme: string,
) {
  const { codeToHtml } = highlighter;
  output.innerHTML = codeToHtml(value, {
    lang,
    theme,
  });
}

function shouldRerender(options: EditorOptions, newOptions: UpdateOptions) {
  return (
    (newOptions.theme !== void 0 && newOptions.theme !== options.theme) ||
    (newOptions.language !== void 0 && newOptions.language !== options.language)
  );
}

interface SnippetEditorProps {
  value?: string;
  onChange: EventListener;
  lang?: string;
}

const SnippetEditor = ({ value = "", onChange, lang }: SnippetEditorProps) => {
  const editorContainerRef = useRef<any>(null);
  const editor = useRef<ShikiCode | null>(null);
  const [isInitializingEditor, setIsInitializingEditor] = useState(true);
  const [isLoadLanguagePending, startLoadLangageTransition] = useTransition();

  useEffect(() => {
    let ignore = false;

    async function initEditor() {
      // declare your theme and language
      const theme = SNIPPET_EDITOR_THEME;
      const lang = SNIPPET_DEFAULT_LANGUAGE;
      setIsInitializingEditor(true);

      // get the highlighter
      const h = await getHighlighter({ langs: [lang], themes: [theme] });

      if (ignore) {
        return;
      }

      editor.current = shikiCode()
        // Optionally, you can config some options or add plugins
        // by using the `withOptions` and `withPlugins` method
        .withPlugins(
          // You can add your own plugins here as well
          // `hookClosingPairs` will automatically close the brackets, braces, etc.
          // Try to type `(`, `[`, or `{` in the editor
          hookClosingPairs(),
          // `hookTab` will automatically indent the code when you press the tab key
          // Try to select random text and press the tab key
          hookTab,
          // `autoload` is used to automatically load theme and language,
          // Normally it is not used unless you are building a playground like this
          autoload,
        )
        .create(editorContainerRef.current, h, {
          value: "",
          language: lang,
          theme,
          name: "code",
        });
      setIsInitializingEditor(false);
    }

    initEditor();

    return () => {
      ignore = true;
      editor.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!isInitializingEditor && editor?.current) {
      startLoadLangageTransition(async () => {
        if (editor?.current) {
          await editor.current.highlighter.loadLanguage(lang as any);
          editor.current.updateOptions({
            language: lang,
          });
        }
      });
    }
  }, [isInitializingEditor, lang]);

  useEffect(() => {
    if (!isInitializingEditor && editor?.current) {
      editor.current.input.addEventListener("input", onChange);

      return () => {
        editor?.current?.input.removeEventListener("input", onChange);
      };
    }
  }, [isInitializingEditor, onChange]);

  useEffect(() => {
    if (!isInitializingEditor && editor?.current) {
      editor.current.value = value;
    }
  }, [isInitializingEditor, value]);

  return (
    <div className="flex flex-col">
      <div
        ref={editorContainerRef}
        className={cn(styles.editor, "overflow-hidden rounded-md")}
      >
        {isInitializingEditor && <Skeleton className="h-full w-full" />}
        {/* <header>
          <select id="lang_list"></select>
          <select id="theme_list"></select>
        </header> */}
        {/* <footer className="editor-footer"></footer> */}
      </div>
    </div>
  );
};

export default SnippetEditor;
