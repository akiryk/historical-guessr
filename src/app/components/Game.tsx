"use client";

import { useState, useEffect } from "react";
import GuessForm from "@/app/components/GuessForm";

const url = "https://historical-guessr.vercel.app";
// const url = "http://localhost:3000";

type Event = {
  event: string;
  year: string;
};

export default function EventFetcher() {
  const [eventData, setEventData] = useState<Event | null>(null);
  const [reframedEvent, setReframedEvent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${url}/api/events`); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEventData(data);
        console.log(data);

        // Reframe the event using OpenAI
        const reframeResponse = await fetch(`${url}/api/reframe-event`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ event: data.event }),
        });
        const reframedData = await reframeResponse.json();
        console.log(reframedData);
        setReframedEvent(reframedData.conversationalEvent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <section className="my-2 p-4 bg-gray-100">
        {eventData && (
          <div>
            <p className="text-orange-800 mb-4 font-bold">
              Original event description:
            </p>
            <p className="text-orange-800 mb-4">{eventData.event}</p>
          </div>
        )}
        {reframedEvent && (
          <div>
            <p className="text-green-800 mb-4 font-bold">
              With help from OpenAI:
            </p>
            <p className="text-green-800 mb-4">{reframedEvent}</p>
          </div>
        )}
      </section>
      <GuessForm actualYear={Number(eventData?.year)} />
      <a href={`${url}/game`} className="text-blue-500">
        Try again!
      </a>
    </div>
  );
}
