"use server";

import { cookies } from "next/headers";

export const handleLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  });

  const data = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("token", data.accessToken);
  return { token: data.accessToken };
};
