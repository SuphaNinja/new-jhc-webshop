"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const navbarLinks= [
    {
        id: 0,
        name: "Home",
        href: "/"
    },
    {
        id: 1,
        name: "Shop",
        href: "/shop"
    },
    {
        id: 2,
        name: "Om oss",
        href: "/about"
    },
    {
        id: 3,
        name: "Projekt",
        href: "/projects"
    },
]

export function NavbarLinks() {
    const location = usePathname();

    return (
        <div className='hidden md:flex justify-center items-center gap-x-4 ml-5'>
            {navbarLinks.map((link) => (
                <Link href={link.href} key={link.id} className={cn(link.href === location 
                    ? "bg-muted" 
                    : "hover:bg-muted hover:bg-opacity-75",
                    "group p-2 font-medium rounded-md"
                )}>
                    {link.name}
                </Link>
            ))}
        </div>
    )
}
