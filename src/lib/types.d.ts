export type ServerResponse = {
  message?: string;
  status?: "failure" | "success";
  ok?: boolean;
};

export type AuthFormInputs = {
  username: string;
  password: string;
};

export type AddResourceFormInputs = {
  name: string;
  image: string;
  link: string;
  description: string;
  categoryId: string;
};

export type AddResourceCategoryFormInputs = {
  name: string;
};
