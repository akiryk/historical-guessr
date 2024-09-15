import Game from "@/app/components/Game";

export default function Home() {
  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold">Welcome to Historical Guessr!</h1>
      <p className="text-lg mt-4">
        Can you guess the year of a random historical event?
      </p>
      <Game />
    </div>
  );
}
