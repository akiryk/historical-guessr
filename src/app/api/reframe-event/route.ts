import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { event } = await request.json();

    // Prepare the prompt for OpenAI
    const prompt = `Reframe the following historical event in a more conversational tone: "${event}"`;

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
