import { Resource, Snippet } from "@prisma/client";

export type ServerResponse = {
  message?: string;
  status?: "failure" | "success";
  ok?: boolean;
};

export type AuthFormInputs = {
  username: string;
  password: string;
};

export type AddSnippetFormInputs = NoUndefinedField<Snippet>;

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export type AddResourceFormInputs = NoUndefinedField<Resource>;

export type AddResourceCategoryFormInputs = {
  name: string;
};

export type AddSnippetCategoryFormInputs = {
  name: string;
};

export type SiteMetaDataResponse = {
  description: string;
  faviconlink: string;
  image: string;
  site_name: string;
  title: string;
  url: string;
};
