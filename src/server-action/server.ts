import "server-only";

export interface User {
  id: number;
  title: string;
  description: string;
  price: string;
}
export async function getData(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data?.products;
}
