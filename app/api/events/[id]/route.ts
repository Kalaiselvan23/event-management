import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
export const GET=async(request:NextApiRequest,{params}:any)=>{
    const {id}=params;
    try{
        const data=await prisma.$queryRaw`select "Events".*,"Location".name as "locationName" from "Events" inner join "Location" on "Events"."locationId"="Location".id where "Events".id=${id}`
        return Response.json(data)
    }
    catch{
        return Response.json({
            msg:"Unable to fetch event"
        })
    }
}