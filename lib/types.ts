import {any, string, z} from "zod"
import NextAuth from "next-auth/next"
import { Role, User } from "@prisma/client"
import { JWT } from "next-auth/jwt"
import { DefaultSession, DefaultUser } from "next-auth"
const paymentEnum=z.enum(["CC","PAYPAL","APPLEPAY"])
export const PriceClassSchema=z.object({
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
    ticket:z.array(PriceClassSchema).optional(),
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
    eventId:z.string().uuid().optional(),
    priceClassId:z.string(),
    userId:z.string().optional(),
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
export const BookingDetailsSchema=z.object({
    priceClassId:z.string(),
    eventId:z.string(),
    userId:z.string(),
})
//ts exports
export type EventType=z.infer<typeof EventSchema>
export type CategoryType=z.infer<typeof CategorySchema>
export type LocationType=z.infer<typeof LocationSchema>
export type PaymentType=z.infer<typeof PaymentSchema>
export type EventFilterType=z.infer<typeof EventFilterSchema>
export type PriceClassType=z.infer<typeof PriceClassSchema>



/*
* auth
*/
declare module 'next-auth'{
    interface Session{
        user:User
    }
    
}
declare module 'next-auth/jwt'{
    // @ts-ignore
    type JWT=User
}

