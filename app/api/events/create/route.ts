import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import {z} from "zod"
import { EventSchema } from '../../../../lib/types';
import { formatDate } from '@/lib/utils';
export const POST=async(request:Request)=>{
    try{
        const event=await request.json();
        console.log(event.date)
        event.date=new Date(event.date);
        EventSchema.parse(event);
        console.log(event)
        const {name,description,date,locationId,venue,categoryId}=event;
        console.log(date)
        const formattedDate = date.toISOString();
        console.log(formattedDate)
        const data = await prisma.events.create({
            data: {
                name,
                description,
                date: formattedDate,
                locationId,
                venue,
                categoryId
            }
        });
        // const data=await prisma.$queryRaw`INSERT INTO "Events" VALUES (${name},${description},${new Date().toISOString()}::timestamp,${locationId},${venue},${categoryId})`
        return Response.json({msg:"Successfully posted"})
    }
    catch(err)
    {
        return Response.json({err})
    }
}