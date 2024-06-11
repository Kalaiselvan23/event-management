import React from 'react'
import { TableCell,TableRow,TableHead,TableHeader,TableBody,Table} from './ui/table'
import CreateEventDialog from './CreateEventDialog'
import { DeleteDialog } from './DeleteDialog'
import { EventType } from '@/lib/types'
export const DataTable = ({events}:{events:EventType[]}) => {
  return (
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
      {events?.map((event: EventType) => {
        return <TableRow key={event.id}>
          <TableCell className="font-medium">{event.name}</TableCell>
          <TableCell>{new Date(event.date).toString()}</TableCell>
          <TableCell>1,024</TableCell>
          <TableCell>980</TableCell>
          <TableCell>$98,000</TableCell>
          <TableCell className="flex gap-2">
            {/* // <CreateEventDialog locations={locations} categories={categories} type="EDIT" /> */}
            <DeleteDialog data={event} />
          </TableCell>
        </TableRow>
      })}
    </TableBody>
  </Table>
  )
}

export default DataTable
