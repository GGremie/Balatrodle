import { Joker } from "@/data/types/joker.type"
import { useEffect, useRef, useState } from "react";
import WinParticles from "./winParticles";

export default function WinPopup({tries, dailyJoker, onClose}: {tries: number, dailyJoker: Joker, onClose: () => void}) {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const jimboRef = useRef<HTMLDivElement>(null)

    const baseCorner = {
        clipPath: "var(--corner-md)",
    }
    const streak = JSON.parse(localStorage.getItem('currentStreak') ?? '{}').currentStreak

    const randomSeed = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    function getTimeRemaining(): number {
        const now = new Date();
        const tomorrow = new Date();

        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        return Math.max(tomorrow.getTime() - now.getTime(), 0);
    }

    const onMouseMove = (e: React.MouseEvent) => {
        let rect = e.currentTarget.getBoundingClientRect();
        let x = ((e.clientY - rect.top - rect.height/2)/(rect.height/2))*12;
        let y = ((e.clientX - rect.left - rect.width/2)/(rect.width/2))*12;
        if (x<0) y = -y
        setMousePosition({x, y})
    };

    useEffect(() => {
        const interval: ReturnType<typeof setInterval> = setInterval(() => {
            setTimeLeft(getTimeRemaining());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function formatTime(timeInMs: number): string {
        const totalSeconds = Math.floor(timeInMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    return (
    <>
        <style>{`
            @keyframes backdropIn {
                from { opacity: 0; }
                to   { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(60rem); }
                to   { transform: translateY(0); }
            }
            .win-backdrop {
                animation: backdropIn 0.2s ease;
            }
            .win-popup {
                animation: slideUp 0.5s cubic-bezier(0.4, 1.31, 0.64, 1);
            }
        `}</style>
        <div className="win-backdrop flex absolute gap-[32rem] w-[100%] h-[100%] z-2 bg-[var(--background-win)] justify-center items-center">
            <div className="w-[10rem] h-[13.375rem] text-center" ref={jimboRef}>
                <WinParticles originRef={jimboRef}/>
                <img className="w-[100%] h-[100%]"
                    src="/images/Joker.png"
                    alt="Joker Image"
                    onMouseMove={onMouseMove}
                    onMouseLeave={() => setMousePosition({x: 0, y: 0})}
                    style={{
                        boxSizing: "border-box",
                        transformStyle: "preserve-3d",
                        transition: "0.1s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
                        transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`,
                        willChange: "transform",
                    }}
                />
            </div>
            <div 
                className="win-popup w-[25%] h-[67%] bg-[var(--balatro-lavender)] p-[0.25rem]"
                style={baseCorner}
                >
                <div className="flex flex-col items-center w-[100%] h-[100%] bg-[var(--body-main)] relative" style={baseCorner}>
                    <h1 className="text-8xl font-semibold pt-2 pb-2 text-[var(--balatro-lavender)] tracking-widest">
                    YOU WIN!
                    </h1>
                    <div className="flex flex-col w-[90%] h-[85%] text-3xl gap-3">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-7 w-[55%]">
                                <div className="flex justify-between text-center bg-[var(--balatro-light-grey)] p-[0.25rem]" style={baseCorner}>
                                    <span className="w-[75%]">Streak</span>
                                    <span className="bg-[var(--body-main)] w-[25%]" style={baseCorner}>{streak}</span>
                                </div>
                                <div className="flex justify-between text-center bg-[var(--balatro-light-grey)] p-[0.25rem]" style={baseCorner}>
                                    <span className="w-[75%]">Tries</span>
                                    <span className="bg-[var(--body-main)] w-[25%]" style={baseCorner}>{tries}</span>
                                </div>
                                <div className="flex justify-between text-center bg-[var(--balatro-light-grey)] p-[0.25rem]" style={baseCorner}>
                                    <span className="w-[60%]">New joker in :</span>
                                    <span className="bg-[var(--body-main)] w-[40%]" style={baseCorner}>{formatTime(timeLeft)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-[var(--balatro-light-grey)] w-[40%] p-[0.25rem]" style={baseCorner}>
                                <span className="text-center pb-2">Today's joker</span>
                                <div className="flex flex-col bg-[var(--body-main)] w-[100%] items-center pb-5" style={baseCorner}>
                                    <span>{dailyJoker.name}</span>
                                    <img className="w-[60%]"
                                        src={`/images/${dailyJoker.name
                                            .replace(/ /g, "_")
                                            .replace(/'/g, "")
                                            .replace(/!/g, "")
                                            .replace(/é/g, "e")}.png`}
                                        alt={dailyJoker.name + " Image"}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="flex justify-between text-center bg-[var(--balatro-light-grey)] w-[100%] p-[0.25rem]" style={baseCorner}>
                                <span className="w-[50%]">Seed</span>
                                <span className="bg-[var(--body-main)] w-[50%]" style={baseCorner}>{randomSeed(today.getTime())}</span>
                            </div>
                            <button
                                onClick={() => {navigator.clipboard.writeText(randomSeed(today.getTime()).toString())}}
                                className="cursor-pointer w-[40%] bg-[var(--balatro-blue)]"
                                type="submit"
                                style={baseCorner}
                                >
                                Copy
                            </button>
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