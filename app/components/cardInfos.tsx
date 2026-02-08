import { Rarity } from "@/data/enums/rarity.enum";
import { Joker } from "@/data/types/joker.type";

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
    <div className="flex justify-center items-center pl-5 pr-5">
        {/* <div className="w-[10%] flex justify-center"> */}
        <img className="w-[10%] ml-[1%] mr-[1%]"
        src={`/images/${joker.name
            .replace(/ /g, "_")
            .replace(/'/g, "")
            .replace(/!/g, "")
            .replace(/é/g, "e")}.png`}
            alt={joker.name + " Image"}
            />
        <div className="flex flex-col w-[88%]">
            <p className="text-center pb-2">
                {joker.name}
            </p>
            <div className="flex w-[100%] pl-[1%] gap-[1%]">
                <div className="flex gap-2 w-[16%] justify-center" style={getBackground('price')}>
                    <p className="text-[var(--money-yellow)]">${joker.price}</p>
                    <p>&gt;</p>
                </div>
                <div className="w-[31%]" style={getBackground('rarity')}>
                    <div style={getRarityBackground()}>
                        <p className="text-center">{joker.rarity}</p>
                    </div>
                    <div className="rarity dropshadow"></div>
                </div>
                <div className="w-[16%]" style={getBackground('type')}>
                    <p className="text-center">{joker.type}</p>
                </div>
                <div className="w-[16%]" style={getBackground('isScaling')}>
                    <p className="text-center">{joker.isScaling ? "Yes" : "No"}</p>
                </div>
                <div className="w-[16%] " style={getBackground('hasRNG')}>
                    <p className="text-center">{joker.hasRNG ? "Yes" : "No"}</p>
                </div>
            </div>
        </div>
    </div>
)}
