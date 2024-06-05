import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { DeleteIcon, TrashIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { CategoryType } from "@/lib/types"
import { api } from "@/lib/axios"
import CreateCategoryDialog from "@/components/CreateCategoryDialog"
const Page = async () => {
  const res = await fetch("http://localhost:3000/api/category")
  const categories: CategoryType[] = await res.json();
  return (
    <div className="p-5">
      <div className="flex justify-end">
        <CreateCategoryDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Id</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Number of Events</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category: CategoryType) => {
            return <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>2</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CreateCategoryDialog />
                  <Button color="red" size="sm" variant="outline">
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          })
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default Page
