import {string, z} from "zod"
export const EventSchema=z.object({
    id:z.string().uuid().optional(),
    name:z.string(),
    date:z.date().optional(),
    categoryId:z.string(),
    description:z.string(),
    locationId:z.string(),
    venue:z.string().min(2).max(15),
    ticket:z.array(z.any()).optional(),
    priceclass:z.array(z.any()).optional(),
    users:z.array(z.any()).optional(),
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
//ts exports
export type EventType=z.infer<typeof EventSchema>
export type CategoryType=z.infer<typeof CategorySchema>
export type LocationType=z.infer<typeof LocationSchema>
