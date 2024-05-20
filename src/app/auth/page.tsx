"use client";
import SubmitButton from "@/components/SubmitButton";
import { login } from "@/lib/auth/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  status: "",
};

export default function Auth() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <main className="min-h-screen p-6">
      <section>
        <form action={formAction}>
          <div className="mb-3">
            <input required name="username" placeholder="Username" />
          </div>
          <div>
            <input required type="password" name="password" placeholder="Password" />
          </div>
          <br />
          <div>
            {state?.status === "failure" && <div className="text-red-500">{state.message}</div>}
          </div>
          <SubmitButton>Login</SubmitButton>
        </form>
      </section>
    </main>
  );
}
