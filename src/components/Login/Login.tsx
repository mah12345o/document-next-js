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
      className="flex flex-col p-10 rounded-2xl gap-6 bg-white w-full max-w-md shadow-xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Login
      </h2>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {emailError && (
          <span className="text-sm text-red-500">{emailError}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {pswError && <span className="text-sm text-red-500">{pswError}</span>}
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow"
      >
        Login
      </button>
    </form>
  );
};
