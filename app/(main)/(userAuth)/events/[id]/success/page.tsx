"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from 'next/navigation';
export default function Component() {
    const router=useRouter();
    useEffect(()=>{
        const handleUnload=(event:any)=>{
            event?.preventDefault();
            router.push('/');
        }
        window.addEventListener('beforeunload',handleUnload)
        return ()=>{
            window.removeEventListener('beforeunload',handleUnload)
        }
    },[router])
  return (
    <div  className="flex flex-col items-center justify-center min-h-dvh bg-gray-100 dark:bg-gray-900 py-12 md:py-24">
      <div className="max-w-md w-full px-6 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="space-y-4">
            <CheckIcon className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Registration Successful
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Congratulations! You have successfully registered for our event. We look forward to seeing you there.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              prefetch={false}
            >
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}