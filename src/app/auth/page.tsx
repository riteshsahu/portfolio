"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth/actions";
import { AuthFormInputs } from "@/lib/types";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Auth() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<AuthFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthFormInputs> = (values) => {
    startTransition(async () => {
      const json = await login(values);
      if (!json.ok && json.message) {
        setError(json.message);
      } else {
        setError("");
      }
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="absolute right-0 top-0 p-5">
        <ThemeToggle />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[400px] space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input required placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!error && <FormMessage>{error}</FormMessage>}
          <Button className="min-w-[117px]" disabled={isPending} type="submit">
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
