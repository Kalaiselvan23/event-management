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
import { error } from "console"
import toast from "react-hot-toast"
const deleteEvent=async(eventId:string)=>{
  const res=await fetch('/api/events', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      id:eventId
    }),
  })
  const response=await res.json();
  if(response.err){
    toast.error(response.err);
  }
  toast.success(response.msg)
}
export function DeleteDialog({ data }: { data: CategoryType | EventType}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure to delete {data.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>deleteEvent(data.id)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
