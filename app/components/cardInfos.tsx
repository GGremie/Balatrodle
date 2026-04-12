import { Rarity } from "@/data/enums/rarity.enum";
import { Type } from "@/data/enums/type.enum";
import { Joker } from "@/data/types/joker.type";
import React, { useState } from "react";

export default function CardInfos({
        joker,
        dailyJoker,
    }: { 
        joker: Joker,
        dailyJoker: Joker,
    }) {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    const bgBase = {
        clipPath: "var(--corner-md)",
        padding: "10px",
    }

    const getBackground = (field: keyof Joker) => {
        if (field === 'price') {
            if (joker.price === dailyJoker.price) {
                return { ...bgBase, backgroundColor: "var(--guess-correct)" };
            }
            if (Math.abs(joker.price - dailyJoker.price) <= 2) {
                return { ...bgBase, backgroundColor: "var(--guess-close)" };
            }
            return { ...bgBase, backgroundColor: "var(--guess-incorrect)" };
        }
        
        return joker[field] === dailyJoker[field]
            ? { ...bgBase,  backgroundColor: "var(--guess-correct)" }
            : { ...bgBase, backgroundColor: "var(--guess-incorrect)" };
    };

    const renderType = () => {
        if (joker.type == Type.CHIPSMULT) {
            return (
                <>
                    <span className="text-[var(--balatro-blue)]">+</span>
                    <span className="text-[var(--balatro-red)]">+</span>
                </>
            )
        } else if (joker.type == Type.MULTMULT) {
            return (
                <span className="bg-[var(--balatro-red)] rounded-xl px-[0.5rem] py-[0.125rem]">
                    {joker.type}
                </span>
            )
        }
        return (
            <p style={getTypeColor()}>
                {joker.type}
            </p>
        )
    }

    const getTypeColor = () => {
        let textColor = {color: 'var(--balatro-blue)'}
        if (joker.type == Type.ADDMULT) {
            textColor = {color: 'var(--balatro-red)'}
        }
        else if (joker.type == Type.CHIPSMULT) {
            textColor = {color: 'var()'}
        }
        else if (joker.type == Type.EFFECT) {
            textColor = {color: 'var(--balatro-purple)'}
        }
        else if (joker.type == Type.RETRIGGER) {
            textColor = {color: 'var(--balatro-green)'}
        }
        else if (joker.type == Type.ECONOMY) {
            textColor = {color: 'var(--money-yellow)'}
        }
        return { 
            ...textColor,
        }
    }

    const getRarityColor = () => {
        let color = {backgroundColor: 'var(--balatro-purple)'}
        if (joker.rarity == Rarity.COMMON) {
            color = {backgroundColor: 'var(--balatro-blue)'}
        }
        else if (joker.rarity == Rarity.UNCOMMON) {
            color = {backgroundColor: 'var(--balatro-green)'}
        }
        else if (joker.rarity == Rarity.RARE) {
            color = {backgroundColor: 'var(--balatro-red)'}
        }
        return { 
            ...color,
            clipPath: "var(--corner-md)",
        }
    }

    const getRarityShadowColor = () => {
        let color = {filter: 'drop-shadow(0 4px 0 var(--balatro-purple-shadow))'}
        if (joker.rarity == Rarity.COMMON) {
            color = {filter: 'drop-shadow(0 4px 0 var(--balatro-blue-shadow))'}
        }
        else if (joker.rarity == Rarity.UNCOMMON) {
            color = {filter: 'drop-shadow(0 4px 0 var(--balatro-green-shadow))'}
        }
        else if (joker.rarity == Rarity.RARE) {
            color = {filter: 'drop-shadow(0 4px 0 var(--balatro-red-shadow))'}
        }
        return (
            color
        )
    }

    const getPriceSimbol = () => {
        if (joker.price > dailyJoker.price) {
            return <span>&gt;</span>
        } else if (joker.price < dailyJoker.price) {
            return <span>&lt;</span>
        }
        return ""
    }

    const onMouseMove = (e: React.MouseEvent) => {
        let rect = e.currentTarget.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) - rect.width/2);
        const y = Math.round((e.clientY - rect.top) - rect.height/2);
        setMousePosition({x, y})
    };

    return (
    <>
        <style>{`
            .rotate:hover {
                transform: rotate3d(${mousePosition.y}, ${-mousePosition.x}, 0, 45deg)
            }
        `}</style>
        <div className="flex justify-center items-center pl-5 pr-5">
            <img onMouseMove={onMouseMove} className="rotate w-[10%] ml-[1%] mr-[1%]"
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
                        <p className="rotate-90">{getPriceSimbol()}</p>
                    </div>
                    <div className="flex justify-center w-[31%]" style={getBackground('rarity')}>
                        <div className="w-[11rem]" style={getRarityShadowColor()}>
                            <div style={getRarityColor()}>
                                <p className="text-center">{joker.rarity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[16%]" style={getBackground('type')}>
                        <div className="text-center">{renderType()}</div>
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
    </>
)}
