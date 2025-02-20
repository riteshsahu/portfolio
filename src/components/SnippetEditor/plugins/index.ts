import type { EditorOptions, ShikiCode } from "../SnippetEditor";

export type IDisposable = () => void;
export type { EditorOptions, IndentOptions, ShikiCode } from "../SnippetEditor";

export type EditorPlugin = {
  // eslint-disable-next-line no-unused-vars
  (editor: ShikiCode, options: EditorOptions): IDisposable;
};

export * from "./autoload";
export * from "./closing_pairs";
export * from "./tab";
