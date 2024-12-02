import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import React from 'react'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { AvatarImage } from '@radix-ui/react-avatar'

interface iAppProps {
    email: string;
    name: string;
    userImage: string;
}

export function UserDropdown({email, name, userImage}: iAppProps) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant={"ghost"} className="relative size-10 rounded-full">
                <Avatar className="size-10">
                    <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
            <DropdownMenuLabel className="flex flex-col space-y-1">
                <p className='text-sm font-medium leading-none'>{name}</p>
                <p className='text-xs text-muted-foreground leading-none'>{email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild>
                <LogoutLink>Log Out</LogoutLink>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
