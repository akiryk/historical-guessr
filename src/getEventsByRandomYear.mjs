import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function getRandomYear() {
  const years = await fs.readFile("years_with_events.json", "utf-8");
  const yearsArray = JSON.parse(years);
  const randomIndex = Math.floor(Math.random() * yearsArray.length);
  return yearsArray[randomIndex];
}

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
      },
    }
  );

  if (!response.ok) {
    console.error(
      `Failed to fetch data for year ${randomYear}: ${response.statusText}`
    );
    return;
  }

  const data = await response.json();
  return data;
}

async function getSingleEventByRandomYear() {
  const events = await getEventsByRandomYear();
  const randomIndex = Math.floor(Math.random() * events.length);
  const { year, event } = events[randomIndex];
  console.log(`Random event for year ${year}: ${event}`);
}

getSingleEventByRandomYear();
