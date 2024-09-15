"use client";
import { useState } from "react";

export default function GuessForm({ actualYear }: { actualYear: number }) {
  const [guess, setGuess] = useState("");
  const [grade, setGrade] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const guessedYear = parseInt(guess, 10);
    const difference = Math.abs(guessedYear - actualYear);

    let grade = "";
    if (difference === 0) {
      grade = "perfect";
    } else if (difference <= 10) {
      grade = "excellent";
    } else if (difference <= 50) {
      grade = "okay";
    } else if (difference <= 200) {
      grade = "meh";
    } else {
      grade = "bad";
    }

    setGrade(`Your guess: ${guessedYear}. Grade: ${grade}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="guess" className="block mb-2 font-medium text-gray-700">
        When did it happen? Enter a year:
      </label>
      <input
        type="text"
        id="guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
      <button
        type="submit"
        className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
      {grade && <p className="mt-4 text-lg font-bold">{grade}</p>}
      {grade && <p>The actual date of the event, sadly, was {actualYear}</p>}
    </form>
  );
}
