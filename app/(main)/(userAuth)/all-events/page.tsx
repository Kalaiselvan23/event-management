import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { CardContent, Card } from "@/components/ui/card"
import Link from "next/link"
import { PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination"
import { Select, SelectTrigger, SelectItem, SelectLabel, SelectGroup, SelectValue, SelectContent } from "@/components/ui/select"
import DatePickerWithRange from "@/components/DatePickerWithRange"
import EventCard from "@/components/EventCard"
import { CategoryType, EventType, LocationType } from "@/lib/types"
import { Endpoint, fetchFromApi } from "@/lib/utils"
import { Suspense } from "react"
import { SkeletonCard } from '../../../components/SkeletonCard';
import {Triangle} from "react-loader-spinner"
type FetchedData = {
    events: { msg: string, data: EventType[] };
    categories: { msg: string, data: CategoryType[] };
    locations: { msg: string, data: LocationType[] };
};
export default async function Component() {

    const endPoints: Endpoint<FetchedData>[] = [
        { key: 'locations', url: "location" },
        { key: 'events', url: 'events' },
        { key: 'categories', url: 'category' },
    ];
    const { events, locations, categories } = await fetchFromApi(endPoints);
    const loadFilter = async (formData: FormData) => {
        'use server'
        const rawFormData = {
            searchParam: formData.get('searchParam'),
            category: formData.get('category'),
            date: formData.get('date'),
        }
    }
    return (
        <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">All Events</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Explore our upcoming events and find the ones that interest you.
                </p>
            </div>
            <form name="filtername" action={loadFilter}>
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex-1">
                        <Input className="w-full" placeholder="Search events..." name="searchParam" type="search" />
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <Select name="category">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Catgories</SelectLabel>
                                    {categories?.data && categories?.data.map((category: CategoryType) => {
                                        return <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>

                                    })}

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <DatePickerWithRange />
                        <Button variant={"default"} type="submit">Apply</Button>
                    </div>
                </div>
            </form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {events?.data && events?.data.map((event: any) => <EventCard event={event} key={event.id} />)}
            </div>
            <div className="mt-8 flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </main>
    )
}

function CalendarIcon(props: any) {
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





