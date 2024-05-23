"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { redirect, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
type loginInput = {
  email: string;
  password: string;
}
export default function Component() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<loginInput>({ email: "", password: "" })
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const res = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    })
    if (res?.ok) { router.push('/') }
    else { router.push("/auth") }
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#9333EA] px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
            <CalendarIcon className="mr-2 h-5 w-5" />
            Event Registration
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Join our upcoming event</h1>
          <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              id="email"
              placeholder="name@example.com"
              required
              // type="email"
              value={credentials.email}
              onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400" href="#">
                Forgot Password?
              </Link>
            </div>
            <Input
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              id="password"
              required
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>
          <Button
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:text-gray-900 dark:hover:bg-indigo-300"
            type="submit"
          >
            Sign In
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Dont have an account?
          <Link className="font-medium text-indigo-600 hover:underline dark:text-indigo-400" href="#">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}