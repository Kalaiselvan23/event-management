import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { DeleteIcon, TrashIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { CategoryType } from "@/lib/types"
import { api } from "@/lib/axios"
import CreateCategoryDialog from "@/components/CreateCategoryDialog"
import { DeleteDialog } from "@/components/DeleteDialog"
import { fetchFromApi } from "@/lib/utils"
import { Endpoint } from '../../../../lib/utils';
type FetchedData = {
  categories: {
    msg: string,
    data: CategoryType[],
  }
}
const Page = async () => {
  const endpoints: Endpoint<FetchedData>[] = [{ key: 'categories', url: "category" }]
  const { categories } = await fetchFromApi<FetchedData>(endpoints);
  return (
    <div className="p-5">
      <div className="flex justify-end">
        <CreateCategoryDialog type="CREATE"/>
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
          {!categories?.data||categories?.data.length < 1 ? <TableRow>
            <TableCell colSpan={6} className='text-center'>No data to show</TableCell>
          </TableRow> : categories?.data.map((category: CategoryType) => {
            return <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.events?.length}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CreateCategoryDialog category={category} type="EDIT" />
                  <DeleteDialog url="/category" data={category}/>
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
