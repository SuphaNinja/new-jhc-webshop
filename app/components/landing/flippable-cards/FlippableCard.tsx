"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, Repeat } from "lucide-react"
import { CardData } from "./FlippableCards"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FlippableCard({ data }: { data: CardData }) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    const Icon = data.icon

    return (
        <div className="group md:h-96 md:w-96 h-80 w-80">
            <div
                className="relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] cursor-pointer"
                onClick={handleFlip}
                style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front Face */}
                <div className="absolute inset-0 h-full w-full rounded-xl bg-[#EDF0F2] [backface-visibility:hidden] duration-300">
                    <div className="flex flex-col items-center justify-center h-full md:p-6">
                        <Icon className="w-16 h-16 mb-4 text-green-500" />
                        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
                        <Repeat className="w-5 h-5 absolute bottom-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    </div>
                </div>
                {/* Back Face */}
                <div className="absolute flex flex-col items-center justify-evenly p-2 inset-0 h-full w-full rounded-xl bg-[#EDF0F2] dark:bg-[#0F0F11] [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden duration-300">
                    <div className="flex flex-col max-w-xs items-center">
                        <p className="text-left font-medium leading-2">{data.description}</p>
                    </div>
                    <Button asChild variant={"link"} size="lg" className="text-lg inline-flex ">
                        <Link href={data.link}>Läs mer <ChevronRight/></Link>
                    </Button>
                    <Repeat className="w-5 h-5 absolute bottom-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </div>
            </div>
        </div>
    )
}