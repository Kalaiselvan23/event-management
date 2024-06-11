"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CategoryType, EventType } from "@/lib/types"
import { deleteFromApi } from "@/lib/utils"
import { error } from "console"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export function DeleteDialog({ data, url }: { data: CategoryType | EventType, url: string }) {
  const router=useRouter();
  const deleteEvent = async (id: string, url: string) => {
    const response = await deleteFromApi(id, url)
    if (response.err) {
      toast.error(response.err);
    }
    toast.success(response.msg);
    window.location.reload();
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure to delete {data?.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteEvent(data?.id, url)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
