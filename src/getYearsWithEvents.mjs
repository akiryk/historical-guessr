import fetch from "node-fetch"; // Ensure node-fetch is installed
import fs from "fs/promises"; // Using promises for better async handling

// Function to check if a year has events
async function checkYearForEvents(year, apiKey) {
  const response = await fetch(
    `https://api.api-ninjas.com/v1/historicalevents?year=${year}`,
    {
      headers: {
        "X-Api-Key": apiKey,
      },
    }
  );

  if (!response.ok) {
    console.error(
      `Failed to fetch data for year ${year}: ${response.statusText}`
    );
    return false;
  }

  const data = await response.json();

  // Check if the response is an empty array
  return data.length > 0;
}

// Main function to iterate over years and collect years with events
async function findYearsWithEvents() {
  const apiKey = "P3f03BBMRU3N6A4+dv/jOA==A55R9W8J7newvHkM";

  if (!apiKey) {
    throw new Error(
      "API_NINJAS_KEY is not defined in the environment variables"
    );
  }

  const yearsWithEvents = [];
  for (let year = 1; year <= 2016; year++) {
    console.log(`Checking year: ${year}`);
    const hasEvents = await checkYearForEvents(year, apiKey);

    if (hasEvents) {
      console.log(`Year ${year} has events!`);
      yearsWithEvents.push(year);
    } else {
      console.log(`Year ${year} has no events.`);
    }

    // Optional: Add a delay between requests to avoid overwhelming the API
    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay between requests
  }

  // Save the array of years with events to a file and/or print it
  await fs.writeFile(
    "years_with_events.json",
    JSON.stringify(yearsWithEvents, null, 2)
  );
  console.log(
    "Finished checking all years. The results have been saved to years_with_events.json"
  );

  // Print the final result to the console
  console.log("Years with events:", yearsWithEvents);
}

// Run the script
findYearsWithEvents();
