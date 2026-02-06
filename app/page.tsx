'use client'
import { Joker } from "@/data/types/joker.type";
import CardInfos from "./components/cardInfos";
import jokerList from '@/data/jokerList.json'

export default function Home() {
  let jokers = jokerList;
  let guessJoker: Joker = jokers[0];

  function handleGuessClick(joker: Joker) {
    jokers.splice(joker.id - 1, 1);
  }

  return (
    <main className="flex justify-center h-[100%]">
      <div className="flex flex-col items-center gap-6 bg-(--body-main) w-150 h-[100%]">
        <h1 className="text-5xl font-semibold pt-5">
          Balatrodle
        </h1>
        <div>
          <select
            className="basic-single"
            name="jokerSelect"
          ></select>
          <button onClick={() => handleGuessClick(guessJoker)}>Guess</button>
        </div>
        <div className="flex flex-col gap-10">
          {jokers.map((joker) => {
            return (<CardInfos joker={guessJoker} />)
          })}
        </div>
      </div>
    </main>
  );
}