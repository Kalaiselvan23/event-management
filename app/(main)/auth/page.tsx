"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { redirect, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { getServerSession } from "next-auth"
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
  // if(session || session?.user){
  //   redirect('/')
  // }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br px-4 py-12">
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
          <Button className="w-full flex items-center gap-2" onClick={() => signIn('google')}>
            <span>Sign In with</span>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
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