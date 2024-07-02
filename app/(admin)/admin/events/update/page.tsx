"use client";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType, EventSchema, EventType, LocationType, PriceClassType } from "@/lib/types";
import { SubmitHandler, useForm, Controller, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Endpoint, fetchFromApi } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@/components/icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@/components/icons";
import { FilePenIcon } from "lucide-react";
import { Table, TableCell, TableRow, TableHead, TableHeader, TableBody } from "@/components/ui/table";

type FetchedData = {
    categories: { msg: string, data: CategoryType[] | [] };
    locations: { msg: string, data: LocationType[] | [] };
    event?: { msg: string, data: EventType | null };
};

const Page = ({ searchParams: { eventId } }: { searchParams: { eventId: string } }) => {
    const [utilData, setUtilData] = useState<FetchedData>({
        categories: { msg: "", data: [] },
        locations: { msg: "", data: [] },
        event: { msg: "", data: null }
    });
    const router = useRouter();

    const { register, handleSubmit, control, formState: { errors }, watch, reset } = useForm<EventType>({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            name: "",
            venue: "",
            locationId: "",
            categoryId: "",
            description: "",
            date: new Date(),
            priceclass: [],
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "priceclass" });

    useEffect(() => {
        const endPoints: Endpoint<FetchedData>[] = [
            { key: 'locations', url: 'location' },
            { key: 'categories', url: 'category' },
        ];

        if (eventId) {
            endPoints.push({ key: 'event', url: `events/${eventId}` });
        }

        fetchFromApi(endPoints).then(data => {
            // @ts-ignore
            setUtilData(data);
            console.log(data.event?.data)
            if (data.event?.data) {
                reset({
                    name: data.event.data.name,
                    venue: data.event.data.venue,
                    locationId: data.event.data.locationId,
                    categoryId: data.event.data.categoryId,
                    description: data.event.data.description,
                    date: new Date(data.event.data.date as Date),
                    capacity: data.event.data.capacity,
                    //@ts-ignore
                    priceclass: [...data.event?.data?.priceclass]
                });
            }
        });
    }, [eventId, reset]);

    const onSubmit: SubmitHandler<EventType> = async (data: EventType) => {
        data.date = new Date(data.date as Date);
        try {
            const response = eventId
                ? await api.put(`/events/update?eventId=${eventId}`, data)
                : await api.post('/events/create', data);

            const responseData = await response.data;

            if (responseData.err) {
                toast.error(responseData.err);
            } else {
                toast.success(responseData.msg);
                router.push("/admin/events");
            }
        } catch (error) {
            toast.error("An error occurred while processing your request.");
        }
    };

    if (!utilData) {
        return <div>Loading...</div>;
    }

    const { locations, categories } = utilData;
    const handleCancel = () => {
        return router.back();
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">{eventId ? "Edit Event" : "Add Event"}</h1>
                    <p className="text-gray-500 dark:text-gray-400">{eventId ? "Edit the event details." : "Create a new event for your organization."}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="lg" onClick={handleCancel}>
                        Close
                    </Button>
                </div>
            </div>
            <div className="border shadow-sm rounded-lg">
                <form className="grid gap-6 p-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Event Name</Label>
                        <Input id="name" placeholder="Enter event name" {...register('name')} />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Event Description</Label>
                        <Textarea id="description" placeholder="Enter event description" {...register('description')} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input id="capacity" type="number" placeholder="Enter capacity" {...register('capacity', {
                            valueAsNumber: true
                        })} />
                        {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="event-date">Event Date</Label>
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
                                    {watch('date') ? format(new Date(watch('date') as Date), "PPP") : <span>Pick a date</span>}
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
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    )}
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="loc-name">Location</Label>
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
                                        {locations.data && locations.data.map((location: LocationType) => (
                                            <SelectItem key={location.id} value={location.id || ""}>{location.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.locationId && <p className="text-red-500">{errors.locationId.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="event-type">Event Type</Label>
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
                                        {categories.data && categories.data.map((category: CategoryType) => (
                                            <SelectItem key={category.id} value={category.id  || ""}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="venue">Venue</Label>
                        <Input id="venue" placeholder="Enter Venue" {...register('venue')} />
                        {errors.venue && <p className="text-red-500">{errors.venue.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="priceClasses">Price Classes</Label>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fields.length == 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className='text-center'>No data to show</TableCell>
                                    </TableRow>
                                ) : fields.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Input {...register(`priceclass.${index}.name`)} />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" {...register(`priceclass.${index}.price`, { valueAsNumber: true })} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant={"secondary"} onClick={() => remove(index)}>Delete</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button type="button" onClick={() => append({ name: "", price: 0 })}>Add Price</Button>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">{eventId ? "Update Event" : "Create Event"}</Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Page;
