import React from 'react'

const companies = [
    "Material av KATEPAL",  "Säkerhetsutrustning av INTENSO", 
    "Kvalitetsmärkt av SVEBRA","INTENSO Proffesional Workwear", 
    "Kostnadsfri Besiktning"
]

export default function ScrollingCompanies() {
    return (
        <div className="relative flex overflow-x-hidden border-y border-gray-200 bg-gray-50">
            <div className="py-6 animate-marquee whitespace-nowrap flex items-center">
                {companies.map((company, index) => (
                    <span
                        key={`company-1-${index}`}
                        className="mx-8 text-lg font-medium text-gray-800 hover:text-primary transition-colors duration-300 cursor-default"
                    >
                        {company}
                    </span>
                ))}
            </div>
            <div className="absolute top-0 py-6 animate-marquee2 whitespace-nowrap flex items-center">
                {companies.map((company, index) => (
                    <span
                        key={`company-2-${index}`}
                        className="mx-8 text-lg font-medium text-gray-800 hover:text-primary transition-colors duration-300 cursor-default"
                    >
                        {company}
                    </span>
                ))}
            </div>
        </div>
    )
}
