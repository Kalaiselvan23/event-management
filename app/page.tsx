
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { CardContent, Card } from "@/components/ui/card"

export default function Home() {
  return (
    <>
      <header className="w-full bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50 shadow-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-4">
            <Link className="flex items-center gap-2" href="#">
              <MountainIcon className="h-6 w-6" />
              <span className="font-medium text-lg">Acme Events</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="36"
                    src="/placeholder.svg"
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
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="px-6 py-2 text-lg font-medium" size="md" variant="solid">
              Sign Up
            </Button>
          </div>
        </div>
      </header>
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
                  <Button className="px-6 py-2 text-lg font-medium" size="md" variant="solid">
                    Explore Events
                  </Button>
                  <Button className="px-6 py-2 text-lg font-medium" size="md" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div>
                <Carousel className="rounded-xl">
                  <CarouselContent>
                    <CarouselItem>
                      <img
                        alt="Event Image 1"
                        className="aspect-[16/9] w-full object-cover"
                        height="500"
                        src="/placeholder.svg"
                        width="800"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <img
                        alt="Event Image 2"
                        className="aspect-[16/9] w-full object-cover"
                        height="500"
                        src="/placeholder.svg"
                        width="800"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <img
                        alt="Event Image 3"
                        className="aspect-[16/9] w-full object-cover"
                        height="500"
                        src="/placeholder.svg"
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
                <Card className="overflow-hidden rounded-xl shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <img
                    alt="Event Image"
                    className="aspect-[4/3] w-full object-cover"
                    height="240"
                    src="/placeholder.svg"
                    width="360"
                  />
                  <CardContent className="space-y-4 p-6">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                      Corporate Event
                    </div>
                    <h3 className="text-2xl font-bold">Annual Sales Conference</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Join us for our annual sales conference to network, learn, and grow your business.
                    </p>
                    <div className="flex items-center space-x-2">
                      <CalendarDaysIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">June 15, 2023</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">New York, NY</span>
                    </div>
                    <Button className="w-full" size="md" variant="solid">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden rounded-xl shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <img
                    alt="Event Image"
                    className="aspect-[4/3] w-full object-cover"
                    height="240"
                    src="/placeholder.svg"
                    width="360"
                  />
                  <CardContent className="space-y-4 p-6">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                      Wedding
                    </div>
                    <h3 className="text-2xl font-bold">Elegant Garden Wedding</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Celebrate the union of two souls in a beautiful garden setting.
                    </p>
                    <div className="flex items-center space-x-2">
                      <CalendarDaysIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">July 1, 2023</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">San Francisco, CA</span>
                    </div>
                    <Button className="w-full" size="md" variant="solid">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden rounded-xl shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <img
                    alt="Event Image"
                    className="aspect-[4/3] w-full object-cover"
                    height="240"
                    src="/placeholder.svg"
                    width="360"
                  />
                  <CardContent className="space-y-4 p-6">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                      Fundraiser
                    </div>
                    <h3 className="text-2xl font-bold">Charity Gala Dinner</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Join us for an elegant evening of fine dining and entertainment to support a great cause.
                    </p>
                    <div className="flex items-center space-x-2">
                      <CalendarDaysIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">September 1, 2023</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Chicago, IL</span>
                    </div>
                    <Button className="w-full" size="md" variant="solid">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
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

function AwardIcon(props) {
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


function CalendarDaysIcon(props) {
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
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}


function MountainIcon(props) {
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


function SparklesIcon(props) {
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


function UsersIcon(props) {
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