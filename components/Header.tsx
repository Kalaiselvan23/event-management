"use client"
import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import getServerSession from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
const Header =  () => {
  const {data:session,status}=useSession();
  return (
    <div>
      <header className="w-full bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50 shadow-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-4">
            <Link className="flex items-center gap-2" href="/">
              <MountainIcon className="h-6 w-6" />
              <span className="font-medium text-lg">Acme Events</span>
            </Link>

          </div>
          {/* <h3 className='text-white'>{session?.user?JSON.stringify(session):'Not logged in'}</h3> */}
          <div className="flex items-center space-x-4">
            {session?.user? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <Image
                    alt="Avatar"
                    className="rounded-full"
                    height="36"
                    src={session?.user?.image || ""}
                    style={{
                      aspectRatio: "36/36",
                      objectFit: "cover",
                    }}
                    width="36"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/api/auth/signout"}>Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> :
              <Link href={"/auth"} className="px-6 py-2 text-lg font-medium" >
                Sign Up
              </Link>
            }
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header

function MountainIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}