export type AuthFormInputs = {
  username: string;
  password: string;
};

export type ServerResponse = {
  message?: string;
  status?: "failure" | "success";
  ok: boolean;
};
