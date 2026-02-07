import { Rarity } from "@/data/enums/rarity.enum";
import { Joker } from "@/data/types/joker.type";
import { escape } from "querystring";

export default function CardInfos({ joker, toGuess }: { joker: Joker, toGuess: Joker }) {
    const bgBase = {
        clipPath: "var(--corner-md)",
        padding: "10px",
    }

    const getBackground = (field: keyof Joker) => {
        if (field === 'price') {
            if (joker.price === toGuess.price) {
                return { ...bgBase, backgroundColor: "var(--guess-correct)" };
            }
            if (Math.abs(joker.price - toGuess.price) <= 2) {
                return { ...bgBase, backgroundColor: "var(--guess-close)" };
            }
            return { ...bgBase, backgroundColor: "var(--guess-incorrect)" };
        }
        
        return joker[field] === toGuess[field] 
            ? { ...bgBase,  backgroundColor: "var(--guess-correct)" } 
            : { ...bgBase, backgroundColor: "var(--guess-incorrect)" };
    };

    const getRarityBackground = () => {
        if (joker.rarity == Rarity.COMMON) {

        }
        return { 
            clipPath: "var(--corner-md)",
            backgroundColor: 'var(--rarity-rare)',
        }
    }
    
    return (

    <div className="flex flex-col justify-center w-100">
        <div className="text-center">
            {joker.name}
        </div>
        <div className="flex gap-10">
            <img
            src={`/jokerImages/${joker.name
                .replace(/ /g, "_")
                .replace(/'/g, "")
                .replace(/!/g, "")
                .replace(/é/g, "e")}.png`}
            alt={joker.name + " Image"}
            />
            <div className="w-full">
                <div className="flex justify-between">
                    <div className="size-[33%]" style={getBackground('price')}>
                        <p className="text-center">Cost</p>
                        <div className="flex gap-2 justify-center">
                            <p className="text-[var(--money-yellow)]">${joker.price}</p>
                            <p>&gt;</p>
                        </div>
                    </div>

                    <div className="size-[66%]" style={getBackground('rarity')}>
                        <p>Rarity</p>

                        <div className="text-center" style={getRarityBackground()}>
                            <p>{joker.rarity}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="size-[50%]" style={getBackground('type')}>
                        <p>Ability</p>
                        <p>
                        {joker.type}
                        </p>
                    </div>
                    
                    <div className="size-[25%]" style={getBackground('isScaling')}>
                        <p>Scaling</p>
                        <p>{joker.isScaling ? "Yes" : "No"}</p>
                    </div>

                    <div className="size-[25%] " style={getBackground('hasRNG')}>
                        <p>RNG</p>
                        <p>{joker.hasRNG ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}
