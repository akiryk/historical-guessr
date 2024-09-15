import { Suspense } from "react";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/events`,
    {
      cache: "no-store", // Prevents caching if you want fresh data on each request
    }
  );
  const data = await response.json();
  if (data.error) {
    console.error(data.error);
  } else {
    console.log(data);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="m-8">
        <p className="font-bold">When did the following event occur?</p>
        <section className="my-2 p-4 bg-gray-100">
          <p>{data.event}</p>
        </section>
      </main>
    </Suspense>
  );
}
