"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { DeleteIcon } from "./icons"
import { SubmitHandler, useForm } from "react-hook-form"
import { CategorySchema, CategoryType } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axios"
import { PlusIcon } from "./icons"
import toast from "react-hot-toast"
import { useState } from "react"
import { Router } from "lucide-react"
import { useRouter } from "next/navigation"
type propsType = {
    type: "CREATE" | "EDIT",
    category?: CategoryType,
}
const CreateCategoryDialog = ({ type, category }: propsType) => {
    const router=useRouter();
    const { register, watch, handleSubmit, control, formState: { errors } } = useForm<CategoryType>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: category?.name
        }
    })
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const onSubmit: SubmitHandler<CategoryType> = async (data: CategoryType) => {
        console.log(data)
        if (category) {
            const res = await api.put(`/events/update?categoryId=${category.id}`, data)
            const responseData = await res.data
            if (responseData.err) {
                toast.error(responseData.err);
            }
            toast.success(responseData.msg);
            window.location.reload();
            setOpenDialog(false);
        }
        else {
            const res = await api.post('/category/create', data)
            const responseData = await res.data
            if (responseData.err) {
                toast.error(responseData.err)
            }
            toast.success(responseData.msg);
            window.location.reload();
            setOpenDialog(false);
        }
    }
    console.log(watch('name'))
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    {type === "EDIT" ? "Edit" : "Create Category"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                        Make changes to category here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Category
                            </Label>
                            <Input
                                id="name"
                                {...register('name')}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategoryDialog
