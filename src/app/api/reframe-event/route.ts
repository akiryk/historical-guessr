import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { event } = await request.json();

    // Prepare the prompt for OpenAI
    const prompt = `The following historical event has a date and a description "${event}. Please reframe it but do not include the date!.
    You can add a small bit of historical context that isn't included in the description. For example,
    add one brief sentence about the event's significance or the people involved. Remember: don't include the year!`;

    // Call OpenAI's API
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 100,
    });

    const conversationalEvent = completion.choices[0].text;

    return NextResponse.json({ conversationalEvent });
  } catch (error) {
    console.error("Error reframing event:", error);
    return NextResponse.json(
      { error: "Failed to reframe the event" },
      { status: 500 }
    );
  }
}
