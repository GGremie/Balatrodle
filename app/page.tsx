'use client'
import { useEffect, useState } from "react";
import { Joker } from "@/data/types/joker.type";
import { jokerList } from '@/data/jokerList'
import CardInfos from "./components/cardInfos";
import WinPopup from "./components/winPopup";
import HelpPopup from "./components/helpPopup";

export default function Home() {
  const [jokers, setJokers] = useState(jokerList);
  const [tries, setTries] = useState(0);
  const [selectedJoker, setSelectedJoker] = useState(-1);
  const [nameHintNum, setNameHintNum] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClickPos, setSearchClickPos] = useState("0");
  const [guessClickPos, setGuessClickPos] = useState("0");
  const [helpClickPos, setHelpClickPos] = useState("0");
  const [hoveredJokerId, setHoveredJokerId] = useState<number | null>(null);
  const [guessJoker, setGuessJoker]= useState<Joker | null>(null);
  const [guessedJokers, setGuessedJokers]= useState<Joker[]>([])
  const [isSearching, setIsSearching] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [isNameHint, setIsNameHint] = useState(false);
  
  const baseCorner = {
    clipPath: "var(--corner-md)",
  }
  
  const filteredJokers = jokers.filter(joker =>
    joker.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  
  const randomSeed = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const index = Math.floor(randomSeed(today.getTime()) * jokerList.length)
  const dailyJoker = jokerList[index]
  const [nameHint, setNameHint] = useState(dailyJoker.name.replace(/[a-z]/gi, '_'));
  
  const calculateScore = (joker: Joker): number => {
    let score = 0;
    if (joker.price === dailyJoker.price) score++;
    if (joker.rarity === dailyJoker.rarity) score++;
    if (joker.type === dailyJoker.type) score++;
    if (joker.isScaling === dailyJoker.isScaling) score++;
    if (joker.hasRNG === dailyJoker.hasRNG) score++;
    return score;
  };

  function handleGuess(event?: React.FormEvent) {
    event?.preventDefault()
    if (searchTerm.length == 0) return;

    let guess;
    if (selectedJoker > -1) {
      guess = filteredJokers[selectedJoker];
    } else {
      guess = guessJoker ?? filteredJokers[0];
      if (!guess) return;
    }

    setTries(tries => tries+1);
    setJokers(jokers => jokers.filter(joker => joker.id !== guess.id));
    setGuessedJokers([guess, ...guessedJokers]);
    if (guess.id == dailyJoker.id) {
      setIsWin(true)
    } else if (calculateScore(guess) == 5) {
      setIsNameHint(true)
      if (nameHintNum + 1 <= dailyJoker.name.length) {
        setNameHintNum(prev => prev + 1)
      }
    }
    setGuessJoker(null);
    setSelectedJoker(-1)
    setSearchTerm('');
  }
  
  const handleSelectJoker = (joker: Joker) => {
    setGuessJoker(joker);    
    setSearchTerm(joker.name);
    setIsSearching(false);
  }

  const handleHelpClick = () => {
    setIsHelp(true);
  }

  const handleArrowDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredJokers.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedJoker(index =>
        index < filteredJokers.length - 1 ? index + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedJoker(index =>
        index > 0 ? index - 1 : filteredJokers.length - 1
      );
    }    
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {      
      if (e.key === 'Enter') {
        handleGuess()
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (guessedJokers.length === 0) return;
    const expiry = new Date();
    expiry.setHours(24, 0, 0, 0);
    const guessPayload = { expiryDate: expiry.getTime(), guessedJokers };
    localStorage.setItem("guessedJokers", JSON.stringify(guessPayload));
  }, [guessedJokers]);

  useEffect(() => {
    const currentDate = new Date().getTime();
    const guessedJokersLocalStorage = JSON.parse(localStorage.getItem("guessedJokers") ?? "{}");
    
    if (currentDate > guessedJokersLocalStorage.expiryDate) {
      localStorage.clear();
      return;
    }
    const parsedGuessedJokers: Joker[] =
      guessedJokersLocalStorage.guessedJokers !== undefined
      ? guessedJokersLocalStorage.guessedJokers
      : []
    
    setGuessedJokers(parsedGuessedJokers)
    setJokers(jokers => jokers.filter(joker => !parsedGuessedJokers.some(guess => guess.id === joker.id)))
  }, [])

  useEffect(() => {
    if (nameHintNum === 0) return;
    setNameHint(prev => prev.substring(0, nameHintNum-1) + dailyJoker.name[nameHintNum-1] + prev.substring(nameHintNum))
  }, [nameHintNum])

  return (
    <main className="flex justify-center h-[100%]">
      <div className="flex relative flex-col text-3xl items-center gap-4 bg-(--body-main) w-[50%] h-[100%]">
        <h1 className="text-9xl font-semibold pt-5">
          Balatrodle
        </h1>
        <form className="flex gap-5" onSubmit={handleGuess}>
          <div style={{ position: "relative", width: "100%" }}>
            <div className={searchClickPos === "0" ? "drop-shadow-[0_5px_0_var(--body-lighter)]": ""}>
              <input
                type="text"
                className="pl-[1rem] pr-[0.5rem] py-[0.25rem] bg-[var(--balatro-grey)] relative"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                onFocus={() => setIsSearching(true)}
                onBlur={() => {setIsSearching(false); setSelectedJoker(-1)}}
                onMouseDown={() => {if (isWin) setSearchClickPos("4px")}}
                onMouseUp={() => {if (isWin) setSearchClickPos("0")}}
                onKeyDown={handleArrowDown}
                placeholder="Search for a Joker"
                style={Object.assign({}, baseCorner, {top: searchClickPos})}
                disabled={!isWin}
              />
            </div>

            {isSearching && filteredJokers.length > 0 && searchTerm.length != 0 && (
              <div 
                className="flex
                  flex-col 
                  overflow-auto
                  absolute
                  max-h-[20rem]
                  w-[100%]
                  z-1
                  bg-white
                  text-black
                  text-shadow-none
                  px-[0.5rem]
                  py-[0.25rem]
                  top-[49px]"
                style={baseCorner}
              >
                {filteredJokers.map((joker, index) => (
                  <span
                    key={joker.id}
                    onMouseDown={() => handleSelectJoker(joker)}
                    style={Object.assign({}, {
                      padding: '0.5rem',
                      cursor: 'pointer',
                      background: hoveredJokerId === joker.id || selectedJoker === index ? "var(--balatro-light-grey)" : "" }, baseCorner)}
                    onMouseEnter={() => {setHoveredJokerId(joker.id)}}
                    onMouseLeave={() => {setHoveredJokerId(null)}}
                  >
                    {joker.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className={guessClickPos === "0" ? "drop-shadow-[0_5px_0_var(--balatro-red-shadow)]" : ""}>
            <button
              onMouseDown={() => {if (isWin) setGuessClickPos("4px")}}
              onMouseUp={() => {if (isWin) setGuessClickPos("0")}}
              className="cursor-pointer px-[0.5rem] py-[0.25rem] bg-[var(--balatro-red)] relative"
              type="submit"
              style={Object.assign({}, baseCorner, {top: guessClickPos})}
              disabled={isWin}
              >
              Guess
            </button>
          </div>
        </form>
        {isNameHint && (
          <div className="tracking-wide">{nameHint}</div>
        )}
        <div className="flex justify-between p-5 pb-0 w-[100%]">
          <span className="w-[12%] text-center">Joker</span>
          <span className="w-[15%] text-center">Cost</span>
          <span className="w-[28%] text-center">Rarity</span>
          <span className="w-[15%] text-center">Type</span>
          <span className="w-[15%] text-center">Scaling</span>
          <span className="w-[15%] text-center">RNG</span>
        </div>
        <div className="flex flex-col gap-5 w-[100%] text-3xl">
          {guessedJokers.map((joker) => {
            return (<CardInfos key={joker.id} joker={joker} dailyJoker={dailyJoker}/>)
          })}
        </div>

        <div className={"absolute right-5 top-5 " + (helpClickPos === "0" ? "drop-shadow-[0_5px_0_var(--balatro-red-shadow)]" : "")}>
          <button
            className="
            text-2xl
            cursor-pointer
            px-[1rem]
            py-[0.5rem]
            bg-[var(--balatro-red)]
            relative"
            onMouseDown={() => {setHelpClickPos("4px")}}
            onMouseUp={() => {setHelpClickPos("0")}}
            onClick={handleHelpClick}
            style={Object.assign({}, baseCorner,  {top: helpClickPos})}
            >?</button>
          </div>
      </div>

      {isWin && <WinPopup tries={tries} dailyJoker={dailyJoker} onClose={() => setIsWin(false)} />}
      {isHelp && <HelpPopup onClose={() => setIsHelp(false)} />}
    </main>
  );
}