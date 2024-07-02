
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { CardContent, Card } from "@/components/ui/card"
import { useRouter } from "next/router"
import HomeCards from "@/components/HomeCards"
import { redirect } from "next/navigation"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session) {
    redirect('auth')
  }
  return (
    <>
      <main>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
              <div className="flex flex-col items-start justify-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Discover Extraordinary Events
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore a curated selection of the most captivating events, from elegant galas to immersive
                  experiences.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href={"/all-events"} className="px-6 py-2 text-lg font-medium">
                    Explore Events
                  </Link>
                </div>
              </div>
              <div>
                <Carousel className="rounded-xl">
                  <CarouselContent>
                    <CarouselItem>
                      <Image
                        alt="Event Image 1"
                        className="aspect-[16/9] w-full object-cover"
                        height="500"
                        src="/assets/banner1.jpeg" width="800"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <Image
                        alt="Event Image 2"
                        className="aspect-[16/9] w-full object-cover"
                        height="500"
                        src="/assets/banner2.jpeg"
                        width="800"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <Image
                        alt="Event Image 3"
                        className="aspect-[16/9] w-full object-cover"
                        height="500"
                        src="/assets/event.jpeg"
                        width="800"
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Upcoming Events</h2>
                <p className="max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover a diverse range of captivating events, from elegant galas to immersive experiences. Reserve
                  your spot today and be part of something extraordinary.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                <HomeCards />
                <HomeCards />
                <HomeCards />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Why Choose Acme Events?</h2>
                <p className="max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400">
                  We are a team of passionate event professionals dedicated to creating unforgettable experiences for
                  our clients.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center space-y-4">
                  <AwardIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-2xl font-bold">Award-Winning</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our team has been recognized for their exceptional event planning and management skills.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <SparklesIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-2xl font-bold">Innovative Approach</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    We constantly strive to push the boundaries of event design and create unique, memorable
                    experiences.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <UsersIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-2xl font-bold">Dedicated Team</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our team of experienced event professionals is dedicated to ensuring the success of every event we
                    plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function AwardIcon(props: any) {
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
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}


function MountainIcon(props: any) {
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


function SparklesIcon(props:any) {
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
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}


function UsersIcon(props:any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}