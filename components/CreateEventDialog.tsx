"use client"
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusIcon, CalendarIcon } from './icons';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { CategoryType, EventSchema, EventType, LocationType } from '@/lib/types';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from './ui/dialog';
import { cn } from '@/lib/utils';
import { api } from '@/lib/axios';
import { format } from 'date-fns';
import toast, { ToastBar, Toaster } from "react-hot-toast"
import EventFilterBox from './EventFilterBox';
import { Tabs, TabsContent, TabsTrigger, TabsList } from './ui/tabs';
type propsType = {
  type: "CREATE" | "EDIT",
  locations: LocationType[],
  categories: CategoryType[],
  event?: EventType,
}
const CreateEventDialog = ({ locations, categories, type, event }: propsType) => {

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<EventType>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      date: event?.date,
      name: event?.name,
      venue: event?.venue,
      locationId: event?.locationId,
      categoryId: event?.categoryId,
      description: event?.description,
    }
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const onSubmit: SubmitHandler<EventType> = async (data: EventType) => {
    data.date = new Date(data.date);
    if (event) {
      const res = await api.put(`/events/update?eventId=${event.id}`, data)
      const responseData = await res.data
      if (responseData.err) {
        toast.error(responseData.err);
      }
      toast.success(responseData.msg);
      window.location.reload();
      setOpenDialog(false);
    }
    else {
      const res = await api.post('/events/create', data)
      const responseData = await res.data
      if (responseData.err) {
        toast.error(responseData.err)
      }
      toast.success(responseData.msg);
      window.location.reload();
      setOpenDialog(false);
    }
  };
  const onErrors: any = (errors: any) => {
    console.log(errors)
  }
  
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="ml-auto" variant="outline">
          <PlusIcon className="h-4 w-4 mr-2" />
          {type === "EDIT" ? "Edit " : "Create Event"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue='event'>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="event">Event</TabsTrigger>
            <TabsTrigger value="priceClass">Price Class</TabsTrigger>
          </TabsList>
          <DialogHeader>
            <DialogTitle>{type === "EDIT" ? "Edit Event" : "Create Event"}</DialogTitle>
            <DialogDescription>Fill out the details for your new event.</DialogDescription>
          </DialogHeader>
          <TabsContent value='event'>
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="event-name">
                    Event Name
                  </Label>
                  <Input className="col-span-3" id="event-name" placeholder="Annual Conference 2024" {...register('name')} />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="loc-name">
                    Location
                  </Label>
                  <Controller
                    control={control}
                    name="locationId"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Location type" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.length > 0 && locations.map((location: LocationType) => (
                            <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.name && <p className="text-red-500">{errors.locationId?.message}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="venue">
                    Venue
                  </Label>
                  <Input className="col-span-3" id="venue" placeholder="Eg.Nehru Stadium" {...register('venue')} />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="event-date">
                    Event Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !watch('date') && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watch('date') ? format(watch('date'), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date)}
                            initialFocus
                          />
                        )}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="event-type">
                    Event Type
                  </Label>
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.length > 0 && categories.map((category: CategoryType) => (
                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="event-description">
                    Description
                  </Label>
                  <Textarea
                    className="col-span-3"
                    id="event-description"
                    placeholder="Enter a description for your event"
                    {...register('description')}
                  />
                  {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{(event) ? 'Update Event' : 'Create Event'}</Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value='priceClass'>
            <form>
              <div className="grid grid-cols-4 items-center gap-4 py-4">
                <Label className="text-right" htmlFor="event-name">
                Price Class 
                </Label>
                <Input className="col-span-3" id="event-name" placeholder="Annual Conference 2024" {...register('name')} />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4 py-4">
                <Label className="text-right" htmlFor="event-name">
                  Price
                </Label>
                <Input className="col-span-3" id="event-name" placeholder="Annual Conference 2024" {...register('name')} />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
