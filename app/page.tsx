'use client'
import { useState } from "react";
import { Joker } from "@/data/types/joker.type";
import { jokerList } from '@/data/jokerList'
import CardInfos from "./components/cardInfos";

export default function Home() {
  const [jokers, setJokers] = useState(jokerList);
  const [searchTerm, setSearchTerm] = useState('');
  const [guessJoker, setGuessJoker]= useState<Joker | null>(null);
  const [guessedJokers, setGuessedJokers]= useState<Joker[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const baseCorner = {
    clipPath: "var(--corner-md)",
    padding: "0.25rem 0.5rem"
  }

  const guessInputBackground = {
    backgroundColor: "var(--balatro-grey)"
  }
  
  const guessButtonBackground = {
    backgroundColor: "var(--balatro-red)"
  }

  const filteredJokers = jokers.filter(joker =>
    joker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const randomSeed = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const index = Math.floor(randomSeed(today.getTime()) * jokerList.length)
  const dailyJoker = jokerList[index]

  function handleGuessClick() {
    if (guessJoker) {
      setJokers(jokers => jokers.filter(joker => joker.id !== guessJoker.id));
      setGuessedJokers([guessJoker, ...guessedJokers])
      setGuessJoker(null);
      setSearchTerm('');
      if (CardInfos({joker: guessJoker, toGuess: dailyJoker})[1] == true) {
        setIsWin(true)
      }
    }
  }
  
  const handleSelectJoker = (joker: Joker) => {
    setGuessJoker(joker);
    setSearchTerm(joker.name);
    setIsSearching(false);
  }
  
  return (
    <main className="flex justify-center h-[100%]">
      <div className="flex flex-col items-center gap-4 bg-(--body-main) w-[50%] h-[100%]">
        <h1 className="text-9xl font-semibold pt-5">
          Balatrodle
        </h1>
        <div className="flex text-3xl gap-5">
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              className="pl-[1rem]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              placeholder="Search for a Joker"
              style={Object.assign({}, guessInputBackground, baseCorner)}
            />
            
            {isSearching && filteredJokers.length > 0 && (
              <div 
                className="flex flex-col overflow-auto absolute max-h-[20rem] w-[100%] z-1 bg-white text-black text-shadow-none"
                style={baseCorner}
              >
                {filteredJokers.map(joker => (
                  <span
                    key={joker.id}
                    onMouseDown={() => handleSelectJoker(joker)}
                    style={{ padding: '0.5rem', cursor: 'pointer' }}
                  >
                    {joker.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleGuessClick}
            disabled={!guessJoker}
            className="cursor-pointer"
            type="submit"
            style={Object.assign({}, guessButtonBackground, baseCorner)}
          >
            Guess
          </button>
        </div>
        <div className="flex justify-between p-5 pb-0 text-3xl w-[100%]">
          <span className="w-[12%] text-center">Joker</span>
          <span className="w-[15%] text-center">Cost</span>
          <span className="w-[28%] text-center">Rarity</span>
          <span className="w-[15%] text-center">Type</span>
          <span className="w-[15%] text-center">Scaling</span>
          <span className="w-[15%] text-center">RNG</span>
        </div>
        <div className="flex flex-col gap-5 w-[100%] text-3xl">
          {guessedJokers.map((joker) => {
            return (<CardInfos key={joker.id} joker={joker} toGuess={dailyJoker} />)
          })}
        </div>
      </div>

      {true && (
        <div className="flex absolute w-[100%] h-[100%] z-2 bg-[var(--background-win)]">
          <div>Centrer la div pour faire la popup de win</div>
        </div>
      )}
    </main>
  );
}