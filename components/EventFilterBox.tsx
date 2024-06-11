'use client'
import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { FilterIcon, CalendarIcon } from './icons'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Calendar } from './ui/calendar'
import { SelectValue, SelectTrigger, Select, SelectItem, SelectContent } from './ui/select'
import { CategoryType, EventFilterType, LocationType } from '@/lib/types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EventFilterSchema } from '@/lib/types'
import { format } from 'date-fns'
import { cn } from '@/lib/utils' // Assuming you have a utility function for conditional classes
import { api } from '@/lib/axios'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

type PropsType = {
    categories: CategoryType[],
    locations: LocationType[],
}

const EventFilterBox = ({ categories, locations }: PropsType) => {
    const router=useRouter();
    const { register, handleSubmit, control } = useForm<EventFilterType>({
        resolver: zodResolver(EventFilterSchema),
        defaultValues: {
            eventDate: { from: undefined, to: undefined },
            categoryId: '',
            eventStatus: 'all',
        }
    });

    const onSubmit: SubmitHandler<EventFilterType> = async (formData:EventFilterType) => {
        console.log('Filter applied');
        router.push(`/admin/events?categoryId=${formData.categoryId}&status=${formData.eventStatus}&from=${formData.eventDate.from}&to=${formData.eventDate.to}`)
    };
    const clearFilter=(event:any):void=>{
        event.preventDefault();
        router.push('/admin/events')
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="flex items-center gap-2" variant="outline">
                    <FilterIcon className="h-4 w-4" />
                    <span>Filter</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="event-date">Event Date</Label>
                            <Controller
                                name="eventDate"
                                control={control}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value.from && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value.from ? (
                                                    field.value.to ? (
                                                        <>
                                                            {format(field.value.from, "LLL dd, y")} -{" "}
                                                            {format(field.value.to, "LLL dd, y")}
                                                        </>
                                                    ) : (
                                                        format(field.value.from, "LLL dd, y")
                                                    )
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={field.value.from}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="event-type">Event Type</Label>
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select event type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.length > 0 && categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="event-status">Event Status</Label>
                            <Controller
                                control={control}
                                name="eventStatus"
                                render={({ field }) => (
                                    <Select id="event-status" onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select event status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upcoming">Upcoming</SelectItem>
                                            <SelectItem value="past">Past</SelectItem>
                                            <SelectItem value="all">All</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={clearFilter}>Clear</Button>
                            <Button type="submit">Apply</Button>
                        </div>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default EventFilterBox;
