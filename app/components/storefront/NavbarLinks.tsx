"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const navbarLinks= [
    {
        id: 0,
        name: "Hem",
        href: "/"
    },
    {
        id: 1,
        name: "Webshop",
        href: "/shop"
    },
    {
        id: 2,
        name: "Tjänster",
        href: "/services"
    },
    {
        id: 3,
        name: "Om oss",
        href: "/about"
    },
    {
        id: 4,
        name: "Projekt",
        href: "/projects"
    },
]

export function NavbarLinks() {
    const location = usePathname();

    return (
        <div className='flex flex-col md:flex-row md:justify-center md:items-center gap-4 ml-5'>
            {navbarLinks.map((link) => (
                <Link href={link.href} key={link.id} className={cn(link.href === location 
                    ? "underline underline-offset-4" 
                    : "hover:underline",
                    "group p-2 font-medium rounded-md underline-offset-4"
                )}>
                    {link.name}
                </Link>
            ))}
        </div>
    )
}
