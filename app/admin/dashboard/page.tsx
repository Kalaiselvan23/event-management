import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Popover,PopoverTrigger,PopoverContent} from "@/components/ui/popover"
import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from "@/components/AdminSidebar"
import { Select,SelectContent, SelectItem,SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenuRadioGroup,DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { PlusIcon,FilterIcon,ListIcon} from "@/components/icons"
import { Calendar } from "@/components/ui/calendar"
export default function Component() {
  return (
    // <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      // <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      // <AdminSidebar/>
      // </div>
      // <div className="flex flex-col">
      //  <AdminHeader/>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Total Events</CardTitle>
                <CardDescription>The total number of events in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">124</div>
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
                      <Label htmlFor="event-name">Event Name</Label>
                      <Input id="event-name" placeholder="Search by event name" />
                    </div>
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
              <Button className="ml-auto" variant="outline">
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Registrations</TableHead>
                  <TableHead>Tickets Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Annual Conference 2023</TableCell>
                  <TableCell>May 15, 2023</TableCell>
                  <TableCell>1,024</TableCell>
                  <TableCell>980</TableCell>
                  <TableCell>$98,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Product Launch Event</TableCell>
                  <TableCell>June 1, 2023</TableCell>
                  <TableCell>512</TableCell>
                  <TableCell>480</TableCell>
                  <TableCell>$48,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Developer Meetup</TableCell>
                  <TableCell>July 1, 2023</TableCell>
                  <TableCell>256</TableCell>
                  <TableCell>240</TableCell>
                  <TableCell>$24,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Marketing Workshop</TableCell>
                  <TableCell>August 15, 2023</TableCell>
                  <TableCell>128</TableCell>
                  <TableCell>120</TableCell>
                  <TableCell>$12,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sales Kickoff</TableCell>
                  <TableCell>September 1, 2023</TableCell>
                  <TableCell>64</TableCell>
                  <TableCell>60</TableCell>
                  <TableCell>$6,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tickets</TableHead>
                  <TableHead>Checked In</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bob Johnson</TableCell>
                  <TableCell>bob@example.com</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Alice Williams</TableCell>
                  <TableCell>alice@example.com</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tom Davis</TableCell>
                  <TableCell>tom@example.com</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Ticket Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Annual Conference 2023</TableCell>
                  <TableCell>Early Bird</TableCell>
                  <TableCell>$99</TableCell>
                  <TableCell>500</TableCell>
                  <TableCell>$49,500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Annual Conference 2023</TableCell>
                  <TableCell>Regular</TableCell>
                  <TableCell>$149</TableCell>
                  <TableCell>480</TableCell>
                  <TableCell>$71,520</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Product Launch Event</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>

    // </div>
  )
}
















