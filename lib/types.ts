import {any, string, z} from "zod"
const paymentEnum=z.enum(["CC","PAYPAL","APPLEPAY"])
export const PriceClass=z.object({
    id:z.string().optional(),
    name:z.string(),
    price:z.number().min(0).max(100000,'Maximum should be 100000'),
    eventId:z.string(),
})
export const EventSchema=z.object({
    id:z.string().uuid().optional(),
    name:z.string(),
    date:z.date().optional(),
    categoryId:z.string(),
    description:z.string(),
    locationId:z.string(),
    venue:z.string().min(2).max(15),
    ticket:z.array(PriceClass).optional(),
    priceclass:z.array(z.any()).optional(),
    users:z.array(z.any()).optional(),
    capacity:z.number().min(1,'Minimum 1 should be the capacity').max(1000000,'Maximum capacity is 10000'),
    createdAt:z.date().optional(),
})

export const CategorySchema=z.object({
    id:z.string().uuid().optional(),
    name:z.string().min(5,'Name should be more than 1 character'),
    events:z.array(z.any()).optional(),
})
export const LocationSchema=z.object({
    id:z.string().uuid().optional(),
    name:z.string().min(2,"Name should be more than 2 characters").max(20,"Name should not be more than 20 characters"),
})
export const PaymentSchema=z.object({
    id:z.string().uuid().optional(),
    name:z.string().min(2,"Name should be more than 2 characters").max(20,"Name should not be more than 20 characters"),
    email:z.string().email(),
    paymentMethod:paymentEnum,
    eventId:z.string().uuid(),
    ticketPrice:z.number(),
})
const eventStatusEnum=z.enum(['all','upcoming','past'] as const)
export const EventFilterSchema = z.object({
    eventDate: z.object({
        from: z.date().optional(),
        to: z.date().optional()
    }),
    categoryId: z.string().optional(),
    locationId:z.string().optional(),
    eventStatus: eventStatusEnum
})
//ts exports
export type EventType=z.infer<typeof EventSchema>
export type CategoryType=z.infer<typeof CategorySchema>
export type LocationType=z.infer<typeof LocationSchema>
export type PaymentType=z.infer<typeof PaymentSchema>
export type EventFilterType=z.infer<typeof EventFilterSchema>