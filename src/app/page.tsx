import { Suspense } from "react";
import GuessForm from "@/app/components/GuessForm";

export const dynamic = "force-dynamic";

const url = "https://historical-guessr.vercel.app";
// const url = "http://localhost:3000";

export default async function Home() {
  const response = await fetch(`${url}/api/events`, {
    cache: "no-store", // Prevents caching if you want fresh data on each request
  });
  const data = await response.json();
  if (data.error) {
    console.error(data.error);
  }

  // Call the reframe-event API route to reframe the event
  const reframeResponse = await fetch(`${url}/api/reframe-event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event: data.event }), // Send only the event description
  });

  const { conversationalEvent } = await reframeResponse.json();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="m-8">
        <p></p>
        <p className="font-bold">
          This doesn&lsquo;t work well, so{" "}
          <a href={`${url}/game`} className="text-sky-500">
            try this instead
          </a>
        </p>

        <section className="my-2 p-4 bg-gray-100">
          <p className=" text-orange-800">
            Original event description: {data.event}
          </p>
        </section>

        <section className="my-2 p-4 bg-gray-100">
          <p className=" text-green-800">
            With help from openai: {conversationalEvent}
          </p>
        </section>
        <GuessForm actualYear={data.year} />
        <a href={url} className="text-blue-500">
          Try again!
        </a>
      </main>
    </Suspense>
  );
}
