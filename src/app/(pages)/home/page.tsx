import HomePage from "@/components/HomePage";
import { getData } from "@/server-action/server";
export default async function HomePagefunction() {
  const data = await getData();

  return (
    <div className="px-20 mt-20 flex gap-6 flex-col">
      <HomePage data={data} />
    </div>
  );
}
