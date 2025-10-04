"use client";

import { handleLogin } from "@/server-action/action";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [pswError, setPswError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) {
      setEmailError("Please enter email id.");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPswError("Please enter password.");
      return;
    }

    const { token } = await handleLogin({ email: email, password: password });

    if (token) {
      router.push("/home");
    }
  }

  return (
    <form
      className="flex flex-col p-20 rounded-2xl gap-2 bg-white w-fit"
      onSubmit={handleSubmit}
    >
      <input
        defaultValue="emilys"
        type="text"
        name="email"
        placeholder="Email"
      />
      {emailError}
      <input
        defaultValue="emilyspass"
        type="password"
        name="password"
        placeholder="Password"
      />
      {pswError}
      <button type="submit">Login</button>
    </form>
  );
};
