import React from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@/components/icons'
import { Select,SelectItem,SelectContent,SelectTrigger,SelectValue} from '@/components/ui/select'
import { Table,TableHeader,TableHead,TableCell,TableRow,TableBody } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Pagination,PaginationContent,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,PaginationEllipsis} from '@/components/ui/pagination'
import { DeleteIcon,TrashIcon } from '@/components/icons'
const Page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Attendees</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage and view all event attendees.</p>
            </div>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Attendee
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 order-2 md:order-1">
              <div className="font-medium">Filters</div>
              <div className="grid gap-2">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="annual-conference">Annual Conference 2023</SelectItem>
                    <SelectItem value="product-launch">Product Launch Event</SelectItem>
                    <SelectItem value="developer-meetup">Developer Meetup</SelectItem>
                    <SelectItem value="marketing-workshop">Marketing Workshop</SelectItem>
                    <SelectItem value="sales-kickoff">Sales Kickoff</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Checked In" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full" variant="outline">
                  Clear Filters
                </Button>
              </div>
            </div>
            <div className="border shadow-sm rounded-lg flex-1 order-1 md:order-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Tickets</TableHead>
                    <TableHead>Checked In</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>Annual Conference 2023</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <Badge>Yes</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <DeleteIcon className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button color="red" size="sm" variant="outline">
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell>Product Launch Event</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Badge>No</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <DeleteIcon className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button color="red" size="sm" variant="outline">
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Johnson</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>Developer Meetup</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <Badge >Yes</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <DeleteIcon className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button color="red" size="sm" variant="outline">
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Alice Williams</TableCell>
                    <TableCell>alice@example.com</TableCell>
                    <TableCell>Marketing Workshop</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Badge>Yes</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <DeleteIcon className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button color="red" size="sm" variant="outline">
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tom Davis</TableCell>
                    <TableCell>tom@example.com</TableCell>
                    <TableCell>Sales Kickoff</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <Badge>No</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <DeleteIcon className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button color="red" size="sm" variant="outline">
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
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

export default Page
