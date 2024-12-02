import Link from 'next/link'
import React from 'react'
import { NavbarLinks } from './NavbarLinks'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ShoppingBag } from 'lucide-react';
import { UserDropdown } from './UserDropdown';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from '@/components/ui/button';
import { redis } from '@/lib/redis';
import { Cart } from '@/lib/interfaces';

export async function Navbar() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    const cart: Cart | null = await redis.get(`cart-${user?.id}`);
    const totalItems = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <nav className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between'>
            <div className='flex items-center'>
                <Link href={'/'}>
                    <h1 className='text-black font-bold text-xl lg:text-3xl'>
                        <span className='text-blue-500'>JHC</span> Plåt & Bygg AB
                    </h1>
                </Link>
                <NavbarLinks />
            </div>
            <div className='flex items-center'>
                {user ? (
                    <>
                        {(user.email === process.env.ADMIN_EMAIL1 ||
                            user.email === process.env.ADMIN_EMAIL2 ||
                            user.email === process.env.ADMIN_EMAIL3) &&
                        (
                            <Button asChild variant="link" className='font-medium mr-2'>
                                <Link  href={"/dashboard"}>Dashboard</Link>
                            </Button>
                        )}
                        <Link href={'/shoppingcart'} className='group p-2 flex items-center mr-2'>
                            <ShoppingBag className='size-6 text-gray-400 group-hover:text-gray-500'/>
                            <span className='ml-2 text-sm font-medium text-gray-600 group-hover:text-gray-700'>{totalItems}</span>
                        </Link>
                        <UserDropdown
                            email={user.email as string} 
                            name={user.given_name as string} 
                            userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
                        />
                    </>
                ): (
                    <div className='hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2'>
                        <Button variant={"ghost"} asChild>
                            <LoginLink>Sign In</LoginLink>
                        </Button>
                        <span className='h-6 w-px bg-gray-200'></span>
                        <Button variant={"ghost"} asChild>
                            <RegisterLink>Sign Up</RegisterLink>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    )
}
