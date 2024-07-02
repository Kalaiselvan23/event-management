"use client";
import { useSession } from "next-auth/react";
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType, EventType, PaymentType, PriceClassType } from "@/lib/types";
import { PaymentSchema } from '@/lib/types';
import toast from "react-hot-toast";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function BuyForm({ event, user }: any) {
    const router = useRouter();
    const { register, watch, handleSubmit, control, formState: { errors } } = useForm<PaymentType>({
        resolver: zodResolver(PaymentSchema)
    });
    const onSubmit: SubmitHandler<PaymentType> = async (formData: PaymentType) => {
        const res = await api.post('/events/book-tickets', {
            ...formData,
            eventId: event?.id,
            userId:user?.id,
        })
        const responseData = await res.data
        if (responseData.err) {
            toast.error(responseData.err)
        }
        router.push(`/events/${event?.id}/success`)
    };
    const onErrors: any = async (err: any) => {
        console.log(err)
    }



    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Register for Event</CardTitle>
                        <CardDescription>Enter your payment information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" {...register("name")} placeholder="Enter your name" required />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" {...register("email")} placeholder="Enter your email" required type="email" />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="payment-method">Payment Method</Label>
                            <Controller
                                control={control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <RadioGroup className="grid grid-cols-3 gap-4" defaultValue="credit-card" value={field.value} onValueChange={field.onChange} id="payment-method">
                                        <div>
                                            <RadioGroupItem className="peer sr-only" id="credit-card" value="CC" />
                                            <Label
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                                                htmlFor="credit-card"
                                            >
                                                <CreditCardIcon className="mb-3 h-6 w-6" />
                                                Credit Card
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem className="peer sr-only" id="paypal" value="PAYPAL" />
                                            <Label
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                                                htmlFor="paypal"
                                            >
                                                <WalletCardsIcon className="mb-3 h-6 w-6" />
                                                PayPal
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem className="peer sr-only" id="apple-pay" value="APPLEPAY" />
                                            <Label
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                                                htmlFor="apple-pay"
                                            >
                                                <DollarSignIcon className="mb-3 h-6 w-6" />
                                                Apple Pay
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                            {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod.message}</p>}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <span>Event Name</span>
                                <span className="font-medium">{event?.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Date</span>
                                <span className="font-medium">{new Date(event?.date).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Location</span>
                                <span className="font-medium">{event?.venue}</span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span>Ticket Price</span>
                                <span className="font-medium">$99</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <Controller
                                    control={control}
                                    name="priceClassId"
                                    render={({ field }) => (
                                        <RadioGroup className="flex" value={field.value} onValueChange={field.onChange}>
                                            {event?.priceclass && event?.priceclass.map((price: PriceClassType) => (
                                                <div key={price?.id} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={price.id} id={price.id} />
                                                    <Label htmlFor={price.id}>{price.name}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex items-center justify-between">
                            {/* <span className="text-lg font-medium">Total</span>
              <span className="text-lg font-medium">${watch('ticketPrice')}</span> */}
                        </div>
                        <Button className="mt-4 w-full" type="submit">
                            Pay Now
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}

function CreditCardIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    );
}

function DollarSignIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    );
}

function WalletCardsIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
            <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
        </svg>
    );
}
