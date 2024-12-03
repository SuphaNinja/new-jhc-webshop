import React from 'react'


const companies = [
    "TechCorp", "InnovateSolutions", "GlobalSystems", "FutureTech",
    "DataDynamics", "CloudNine", "SmartServe", "QuantumQuest",
    "CyberShield", "EcoTech"
]

export default function ScrollingCompanies() {
    return (
        <div className="relative flex overflow-x-hidden border-b">
            <div className="py-4 animate-marquee whitespace-nowrap flex">
                {companies.map((company, index) => (
                    <span key={`company-1-${index}`} className="mx-8 text-lg font-semibold">{company}</span>
                ))}
            </div>
            <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex">
                {companies.map((company, index) => (
                    <span key={`company-2-${index}`} className="mx-8 text-lg font-semibold">{company}</span>
                ))}
            </div>
        </div>
    )
}
