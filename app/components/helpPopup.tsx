export default function HelpPopup({onClose}: {onClose: () => void}) {
    const baseCorner = {
        clipPath: "var(--corner-md)",
    }

    return (
    <>
        <style>{`
            @keyframes backdropIn {
                from { opacity: 0; }
                to   { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(70rem); }
                to   { transform: translateY(0); }
            }
            .win-backdrop {
                animation: backdropIn 1s ease;
            }
            .win-popup {
                animation: slideUp 0.5s cubic-bezier(0.4, 1.31, 0.64, 1);
            }
        `}</style>
        <div className="win-backdrop flex absolute w-[100%] h-[100%] z-2 bg-[var(--background-help)] justify-center items-center">
        <div 
            className="win-popup w-[30%] h-[60%] bg-[var(--balatro-light-grey)] p-[0.25rem]"
            style={baseCorner}
            >
            <div className="flex flex-col items-center text-center w-[100%] h-[100%] gap-5 bg-[var(--body-main)] text-2xl relative overflow-auto" style={baseCorner}>                
                <h1 className="text-5xl pt-5">
                    How to play
                </h1>
                <span className="w-[60%]">
                    Guess jokers to reveal hints to help you figure out today's joker.
                </span>
                <div className="flex gap-1 w-[60%]">
                    <div className="bg-[var(--guess-correct)] p-4 w-[33%]" style={baseCorner}>Correct</div>
                    <div className="bg-[var(--guess-close)] p-4 w-[33%]" style={baseCorner}>Close</div>
                    <div className="bg-[var(--guess-incorrect)] p-4 w-[33%]" style={baseCorner}>Incorrect</div>
                </div>
                <div className="flex flex-col gap-2 w-[60%]">
                    <p>
                        <span className="text-[var(--ante-orange)]">Cost </span>
                        is considered close within 
                        <span className="text-[var(--money-yellow)]"> $2</span>.
                    </p>
                    <p>
                        <span className="text-[var(--ante-orange)]">RNG </span>
                        is true if the joker has a 
                        <span className="text-[var(--balatro-green)]"><br />listed probality </span>
                        except for 
                        <span className="text-[var(--balatro-red)]"> Missprint</span>.
                        <span className="text-[var(--ante-orange)]"><br />Scaling </span>
                        is true when the value is displayed in the Joker's description.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-[0.75rem]">
                    <span className="text-4xl">Abilities :</span>
                    <p className="w-[65%] text-[var(--balatro-light-grey)]">
                        According to the&nbsp;
                        <a href="https://balatrowiki.org/w/Jokers">balatro wiki</a>, 
                        Jokers are sorted in 7 types, depending on their function.
                    </p>
                    <div className="flex gap-[3rem]">
                        <div className="flex flex-col gap-[0.5rem]">
                            <div className="flex gap-[2.75rem]">
                                <span className="text-[var(--balatro-blue)] pl-[0.50rem]">+c</span>
                                <span>Chips Joker</span>
                            </div>
                            <div className="flex gap-[2.60rem]">
                                <span className="text-[var(--balatro-red)] pl-[0.50rem]">+m</span>
                                <span>Additive Mult Joker</span>
                            </div>
                            <div className="flex gap-[2rem]">
                                <span className="bg-[var(--balatro-red)] rounded-xl px-[0.5rem] py-[0.125rem]">Xm</span>
                                <span>Multiplicative Mult Joker</span>
                            </div>
                            <div className="flex gap-[2.64rem]">
                                <p className="pl-[0.60rem]">
                                    <span className="text-[var(--balatro-blue)]">+</span>
                                    <span className="text-[var(--balatro-red)]">+</span>
                                </p>
                                <span>Chips & Additive Mult Joker</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[0.5rem]">
                            <div className="flex gap-[2.3rem]">
                                <span className="text-[var(--balatro-purple)] pl-[0.40rem]">!!</span>
                                <span>Effect Joker</span>
                            </div>
                            <div className="flex gap-[2.2rem]">
                                <span className="text-[var(--balatro-green)] pl-[0.25rem]">...</span>
                                <span>Retrigger Joker</span>
                            </div>
                            <div className="flex gap-[2rem]">
                                <span className="text-[var(--money-yellow)]">+$</span>
                                <span>Economy Joker</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button 
                    className="
                    text-3xl
                    cursor-pointer
                    px-[1.125rem]
                    pt-[0.25rem]
                    pb-[0.5rem]
                    bg-[var(--balatro-red)]
                    absolute
                    right-2
                    top-2"
                    style={baseCorner}
                    onClick={onClose}
                    >x</button>
                </div>
            </div>
        </div>
    </>
    )
}