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
import { Endpoint, fetchFromApi } from "@/lib/utils"
import { LocationType, CategoryType } from '../../../../lib/types';
import EventFilterBox from "@/components/EventFilterBox"
import DataTable from "@/components/DataTable"

type FetchedData = {
  events: { msg: string, data: EventType[] }
}
export default async function Component({ params }: { params: { categoryId: string, locationId: string } }) {

  const handleSubmit = (event: any) => {
    console.log(event.target.value)
  }
  const { events } = await fetchFromApi<FetchedData>([
    { key: 'events', url: 'events' },
  ]);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Total Events</CardTitle>
            <CardDescription>The total number of events in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{events?.data?.length}</div>
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
          {!events?.data || events?.data.length == 0 ? <TableRow>
            <TableCell colSpan={6} className='text-center'>No data to show</TableCell>
          </TableRow> : events?.data?.map((event: EventType) => {
            return <TableRow key={event.id}>
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell>{new Date(event.date as Date).toString()}</TableCell>
              <TableCell>1,024</TableCell>
              <TableCell>980</TableCell>
              <TableCell>$98,000</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </main>

  )
}
















