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
const CreateCategoryDialog = () => {
    const {register,watch,handleSubmit,control,formState:{errors}}=useForm<CategoryType>({
        resolver:zodResolver(CategorySchema)
    })
    const onSubmit:SubmitHandler<CategoryType> = async(data:CategoryType)=>{
        console.log(data)
        const response=await api.post("/category/create",data)
        const responseData=await response.data;
        console.log(responseData)
    }
    console.log(watch('name'))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    {/* <DeleteIcon className="h-4 w-4" /> */}
                    Edit or Create Category
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
                            defaultValue="Pedro Duarte"
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
