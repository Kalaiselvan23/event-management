import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from "@/components/AdminSidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select"
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { PlusIcon, FilterIcon, ListIcon } from "@/components/icons"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import CreateEventDialog from "@/components/CreateEventDialog"
import { EventType } from "@/lib/types"
import { DeleteDialog } from "@/components/DeleteDialog"
export default async function Component() {
  const eventsResponse = await fetch("http://localhost:3000/api/events", {
    next: {
      revalidate:0
    }
  });
  const events = await eventsResponse.json();
  const handleSubmit = (event) => {
    console.log(event.target.value)
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Total Events</CardTitle>
            <CardDescription>The total number of events in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>The number of events that are scheduled in the future.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Event Registrations</CardTitle>
            <CardDescription>The total number of event registrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
          </CardContent>
        </Card>
      </div>
      <div className="border shadow-sm rounded-lg">
        <div className="p-4 border-b flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex items-center gap-2" variant="outline">
                <FilterIcon className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="event-date">Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-full flex-col h-auto items-start" variant="outline">
                        <span className="font-semibold uppercase text-[0.65rem]">Select Date</span>
                        <span className="font-normal">June 1, 2023 - June 30, 2023</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 max-w-[276px]">
                      <Calendar />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select id="event-type">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="meetup">Meetup</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="event-status">Event Status</Label>
                  <Select id="event-status">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select event status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="past">Past</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Clear</Button>
                  <Button>Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
          <CreateEventDialog type="CREATE" />
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
            {events.map((event: EventType) => {
              return <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{new Date(event.date).toString()}</TableCell>
                <TableCell>1,024</TableCell>
                <TableCell>980</TableCell>
                <TableCell>$98,000</TableCell>
                <TableCell className="flex gap-2">
                  <CreateEventDialog type="EDIT" />
                  <DeleteDialog data={event} />
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </div>
    </main>

  )
}
















