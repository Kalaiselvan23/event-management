import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FilePenIcon } from 'lucide-react'
type propsType = {
    type: String,
}
const EditPriceDialog = ({ type }: propsType) => {
    return (
        <Dialog >
            <DialogTrigger asChild>
             {type=='Edit'?<Button variant="outline" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>:<Button variant={'outline'}>
                    Add Price
                    </Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Price Class</DialogTitle>
                    <DialogDescription>
                        Make changes to the price class here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="priceClassName" className="text-right">
                            Name
                        </Label>
                        <Input id="priceClassName" placeholder="Enter price class name" className="col-span-3" />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="priceClassPrice" className="text-right">
                            Price
                        </Label>
                        <Input id="priceClassPrice" type="number" placeholder="Enter price" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                    <div>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditPriceDialog
