import { NextResponse } from "next/server";
import fs from "fs/promises";

export const dynamic = "force-dynamic";

// Function to get a random year from the JSON file
async function getRandomYear() {
  const years = await fs.readFile("years_with_events.json", "utf-8");
  const yearsArray = JSON.parse(years);
  const randomIndex = Math.floor(Math.random() * yearsArray.length);
  return yearsArray[randomIndex];
}

// Function to fetch events for the given random year
async function getEventsByRandomYear() {
  const apiKey = process.env.API_NINJAS_KEY;

  if (!apiKey) {
    throw new Error(
      "API_NINJAS_KEY is not defined in the environment variables"
    );
  }

  const randomYear = await getRandomYear();
  console.log(`Random year: ${randomYear}`);

  const response = await fetch(
    `https://api.api-ninjas.com/v1/historicalevents?year=${randomYear}`,
    {
      headers: {
        "X-Api-Key": apiKey,
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );

  if (!response.ok) {
    console.error(
      `Failed to fetch data for year ${randomYear}: ${response.statusText}`
    );
    return null;
  }

  const data = await response.json();
  return data;
}

// Function to get a single random event
async function getSingleEventByRandomYear() {
  const events = await getEventsByRandomYear();

  if (!events || events.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * events.length);
  const { year, event } = events[randomIndex];
  return { year, event };
}

// API route handler
export async function GET() {
  try {
    const randomEvent = await getSingleEventByRandomYear();

    if (!randomEvent) {
      return NextResponse.json({ error: "No events found" }, { status: 404 });
    }

    return NextResponse.json(randomEvent);
  } catch (error) {
    console.error("Error fetching random event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
