
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
export const fetchEvent=async(id:string)=>{
  const res=await fetch(`http://localhost:3000/api/events/${id}`)
  const data=await res.json();
  return data[0];
}
export default async function Component({params}:any) {
  const event=await fetchEvent(params.id);
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                 {event.name}
                </h1>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">{event.date} | {`${event.venue} , ${event.locationName}`}</p>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Event Details
                </div>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {event.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href={`${params.id}/buypage`}>Register Now</Link>
              </div>
            </div>
            <img
              alt="Annual Developer Conference"
              className="rounded-lg object-cover w-full aspect-[3/2]"
              height={400}
              src="/placeholder.svg"
              width={600}
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Speakers</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Speakers</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-start gap-2">
                  <Avatar>
                    <AvatarImage alt="Sofia Davis" src="/avatars/01.png" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Sofia Davis</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CEO, Acme Inc.</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Avatar>
                    <AvatarImage alt="Jackson Lee" src="/avatars/02.png" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Jackson Lee</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CTO, Acme Inc.</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Avatar>
                    <AvatarImage alt="Olivia Nguyen" src="/avatars/03.png" />
                    <AvatarFallback>ON</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Olivia Nguyen</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Head of Design, Acme Inc.</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Avatar>
                    <AvatarImage alt="Ethan Flores" src="/avatars/04.png" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Ethan Flores</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager, Acme Inc.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Agenda</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Event Schedule</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                  <div className="rounded-md bg-gray-900 px-3 py-1 text-sm font-medium text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                    9:00 AM
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Keynote Address</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Hear from our CEO on the future of web development.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                  <div className="rounded-md bg-gray-900 px-3 py-1 text-sm font-medium text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                    11:00 AM
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Workshop: Mastering React</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Learn advanced React techniques from our expert team.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                  <div className="rounded-md bg-gray-900 px-3 py-1 text-sm font-medium text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                    2:00 PM
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Panel Discussion</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Hear from industry leaders on the future of web development.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                  <div className="rounded-md bg-gray-900 px-3 py-1 text-sm font-medium text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                    4:00 PM
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Networking Reception</h3>
                    <p className="text-gray-500 dark:text-gray-400">Connect with other attendees and speakers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}