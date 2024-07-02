import React from 'react'
import { LocateIcon } from './icons'
import Link from 'next/link'
import { Card, CardContent } from './ui/card'
import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'
const EventCard = ({event}:any) => {
    return (
        <Link className="group" href={`/events/${event.id}`}>
            <Card className="h-full shadow-lg hover:scale-100 hover:shadow-2xl">
                <Image
                    alt="Event Image"
                    className="aspect-video w-full rounded-t-lg object-cover group-hover:opacity-80 transition-opacity"
                    height={300}
                    width={400}
                    src="/assets/event.jpeg"
                />
                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold tracking-tight">{event.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        {event.description.slice(0,100)}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{new Date(event.date).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <LocateIcon className="h-4 w-4" />
                            <span>{event.location.name && "location is there"}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default EventCard
