import { Joker } from "@/data/types/joker.type";

export default function CardInfos({ joker }: { joker: Joker }) {
  const bgNormal = {
    backgroundColor: "var(--body-light)",
    clipPath: "var(--corner-md)",
    padding: "10px",
    paddingBottom: "0px",
  };
  const bgClose = {

  };
  const bgCorrect = {

  };
  return (

    <div className="flex flex-col justify-center w-100">
        <div className="text-center">
            {joker.name}
        </div>
        <div className="flex gap-10">
            <img
            src="/jokers/j_marble.png"
            alt={joker.name + " Image"}
            />
            <div className="w-full">
                <div className="flex justify-between">
                    <div className="size-[33%]" style={bgNormal}>
                        <p>Cost</p>
                        <div>
                        <p>{joker.price}$</p>
                        <p>&gt;</p>
                        </div>
                    </div>

                    <div className="size-[66%]" style={bgNormal}>
                        <p>Rarity</p>
                        <div>
                            <span>{joker.rarity}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="size-[50%]" style={bgNormal}>
                        <p>Ability</p>
                        <p>
                        {joker.type}
                        </p>
                    </div>
                    
                    <div className="size-[25%]" style={bgNormal}>
                        <p>Scaling</p>
                        <p>{joker.isScaling ? "Yes" : "No"}</p>
                    </div>

                    <div className="size-[25%] " style={bgNormal}>
                        <p>RNG</p>
                        <p>{joker.hasRNG ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}
