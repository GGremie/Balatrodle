'use client'
import { useState } from "react";
import { Joker } from "@/data/types/joker.type";
import CardInfos from "./components/cardInfos";
import jokerList from '@/data/jokerList.json'

export default function Home() {
  const [jokers, setJokers] = useState(jokerList);
  const [searchTerm, setSearchTerm] = useState('');
  const [guessJoker, setGuessJoker]= useState<Joker | null>(null);
  const [guessedJokers, setGuessedJokers]= useState<Joker[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const filteredJokers = jokers.filter(joker =>
    joker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleGuessClick() {
    if (guessJoker) {
      // jokers.splice(guessJoker.id - 1, 1);
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
        <div>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onFocus={() => setIsSearching(true)}
              placeholder="tab"
            />
            
            {isSearching && filteredJokers.length > 0 && (
              <ul>
                {filteredJokers.map(joker => (
                  <li 
                    key={joker.id}
                    onClick={() => handleSelectJoker(joker)}
                    style={{ padding: '8px', cursor: 'pointer' }}
                  >
                    {joker.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={handleGuessClick} disabled={!guessJoker}>
            Guess
          </button>
        </div>
        <div className="flex flex-col gap-10">
          {guessedJokers.map((joker) => {
            return (<CardInfos joker={joker} />)
          })}
        </div>
      </div>
    </main>
  );
}