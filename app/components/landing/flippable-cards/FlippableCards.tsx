"use client"

import { Check, Zap, SunMoon, CheckCircle} from "lucide-react"
import { motion } from "framer-motion";
import FlippableCard from "./FlippableCard";
import { containerVariants, itemVariants } from "@/app/assets/animationVariants";

export interface CardData {
    icon: React.ElementType;
    title: string;
    description: string;
    link: string;
}

const mockData: CardData[] = [
    {
        icon: CheckCircle,
        title: "Vår Garanti",
        description: "När du väljer oss för din takläggning kan du känna dig trygg. Vi erbjuder en 15 års garanti som säkerställer högsta kvalitet och hållbarhet i vårt arbete. Garantin täcker både material och utförande, så att du kan lita på att ditt tak står emot tidens prövningar. Med oss investerar du i trygghet och långsiktig hållbarhet för ditt hem.",
        link: "/warranty"
    },
    {
        icon: SunMoon,
        title: "Vårt Motto",
        description: "Trygghet över taket och kvalitet i varje detalj är vårt motto. Vi strävar efter att leverera hållbara lösningar och överträffa våra kunders förväntningar.Med erfarenhet, noggrannhet och ett öga för detaljer ser vi till att varje tak vi lägger blir en investering i både säkerhet och estetik.Din nöjdhet är vår drivkraft!",
        link: "/about"
    },
]


export default function FlippableCards() {
    return (
        <motion.div
            className="flex flex-col items-center gap-12 py-16 md::py-24 px-4 sm:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-6 max-w-lg">
                <Badge />
                <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl md:max-w-lg">15 Års Garanti</motion.h1>
                <motion.p variants={itemVariants} className="font-medium">Slipp oroa dig med vår stensäkra garanti, vad som än händer så täcker vi det!</motion.p>
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:gap-8">
                    <p className="inline-flex gap-1"><Check color="green"/> <span>15 År orosfritt</span></p>
                    <p className="inline-flex gap-1"><Check color="green" /> <span>Gratis besiktning</span></p>
                </motion.div>
                <motion.div variants={itemVariants}>

                </motion.div>
            </motion.div>
            <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 md:p-4"
            >
                {mockData.map((cardData, index) => (
                    <motion.div variants={itemVariants} key={index} className="w-full col-span-1 h-full">
                        <FlippableCard data={cardData} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

const Badge = () => {
    return (
        <div className="border p-2 px-4 gap-2 inline-flex rounded-full">
            <h1 className="text-md font-medium">Garanti</h1>
        </div>
    )
}