import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { CalendarDaysIcon, LocateIcon } from './icons'
const HomeCards = () => {
    return (
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
    )
}

export default HomeCards
