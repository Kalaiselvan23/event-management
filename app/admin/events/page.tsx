import React from 'react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import EventFilterBox from '@/components/EventFilterBox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { ListIcon, PlusIcon } from '@/components/icons';
import CreateEventDialog from '@/components/CreateEventDialog';
import { DeleteDialog } from '@/components/DeleteDialog';
import { EventType, CategoryType, LocationType } from '@/lib/types';
import { Endpoint, fetchFromApi } from '@/lib/utils';

type FetchedData = {
    events: { msg: string, data: EventType[] };
    categories: { msg: string, data: CategoryType[] };
    locations: { msg: string, data: LocationType[] };
};

const Page = async ({ searchParams: { categoryId, locationId } }: { searchParams: { categoryId: string, locationId: string } }) => {
    let categoryEndpoint = "category";
    let locationEndpoint = "location";
    let eventsEndpoint = "events";
    console.log(categoryId)
    if (categoryId) {
        eventsEndpoint += `?categoryId=${categoryId}`;
    }
    const endPoints: Endpoint<FetchedData>[] = [
        { key: 'locations', url: locationEndpoint },
        { key: 'events', url: eventsEndpoint },
        { key: 'categories', url: categoryEndpoint },
    ];
    console.log("Endpoints", endPoints)
    const { locations, categories, events } = await fetchFromApi<FetchedData>(endPoints);
    console.log("Events", events?.data)
    console.log(locations);
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Events</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage and view all events.</p>
                </div>
            </div>
            <div className="flex w-full md:flex-row gap-4">
                <div className="border w-full shadow-sm rounded-lg">
                    <div className="p-4 border-b flex items-center gap-4">
                        <EventFilterBox locations={locations?.data} categories={categories?.data} />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="flex items-center gap-2" variant="outline">
                                    <ListIcon className="h-4 w-4" />
                                    <span>Sort</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <DropdownMenuRadioGroup value="date">
                                    <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="registrations">Registrations</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="revenue">Revenue</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </PopoverContent>
                        </Popover>
                        <CreateEventDialog categories={categories?.data} locations={locations?.data} type="CREATE" />
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Registrations</TableHead>
                                <TableHead>Tickets Sold</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!events?.data || events?.data.length == 0 ? <TableRow>
                                <TableCell colSpan={6} className='text-center'>No data to show</TableCell>
                            </TableRow> : events?.data?.map((event: EventType) => {
                                return <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.name}</TableCell>
                                    <TableCell>{new Date(event.date).toString()}</TableCell>
                                    <TableCell>1,024</TableCell>
                                    <TableCell>980</TableCell>
                                    <TableCell>$98,000</TableCell>
                                    <TableCell className="flex gap-2">
                                        <CreateEventDialog event={event} locations={locations?.data} categories={categories?.data} type="EDIT" />
                                        <DeleteDialog url='/events' data={event} />
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    )
}

export default Page
