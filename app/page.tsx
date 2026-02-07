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
      setJokers(prev => prev.filter(j => j.id !== guessJoker.id));
      setGuessedJokers([...guessedJokers, guessJoker])
      setGuessJoker(null);
      setSearchTerm('');
    }
  }
  
  const handleSelectJoker = (joker: Joker) => {
    setGuessJoker(joker);
    setSearchTerm(joker.name);
    setIsSearching(false);
  };
  
  return (
    <main className="flex justify-center h-[100%]">
      <div className="flex flex-col items-center gap-6 bg-(--body-main) w-150 h-[100%]">
        <h1 className="text-5xl font-semibold pt-5">
          Balatrodle
        </h1>
        <div className="flex">
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              placeholder="Search for a Joker"
            />
            
            {isSearching && filteredJokers.length > 0 && (
              <div className="flex flex-col overflow-auto absolute max-h-[14.5rem] z-1 bg-white text-black text-shadow-none">
                {filteredJokers.map(joker => (
                  <span
                    key={joker.id}
                    onMouseDown={() => handleSelectJoker(joker)}
                    style={{ padding: '8px', cursor: 'pointer' }}
                  >
                    {joker.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleGuessClick} disabled={!guessJoker}>
            Guess
          </button>
        </div>
        <div className="flex flex-col gap-10">
          {guessedJokers.map((joker) => {
            return (<CardInfos joker={joker} toGuess={dailyJoker} />)
          })}
        </div>
      </div>
    </main>
  );
}