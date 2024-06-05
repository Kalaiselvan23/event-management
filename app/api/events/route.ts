import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { formatDate } from '../../../lib/utils';
export const GET = async (request: NextApiRequest) => {
  try {
    const data =await prisma.$queryRaw`select "Events".*,"Location".name as "locationName" from "Events" inner join "Location" on "Events"."locationId"="Location".id;`;
    console.log(data)
    return Response.json(data);
  } catch {
    return Response.json({
      msg: "Unable to fetch event",
    });
  }
};
export const POST = async (request: Request) => {
  try {
    const { categoryId, fromDate, toDate } = await request.json();
    const formattedFromDate = formatDate(fromDate)
    const formattedToDate = formatDate(toDate);
    const events = await prisma.$queryRaw`SELECT * FROM "Events"
      WHERE "categoryId" = ${categoryId}
      AND "date" > timestamp '${formattedFromDate}' AND "date" < timestamp'${formattedToDate}'`;
    return Response.json(events);
  } catch (err) {
    return Response.json({
      msg: "Unable to post event",
    });
  }
};

export const DELETE=async(request:Request)=>{
  try{
    const {id}=await request.json();
    console.log(id)
    const event=await prisma.events.delete({
      where:{
        id
      }
    })
    console.log(event)
    return Response.json({msg:"Event Deleted Successfully",data:event})
  }
  catch(err)
  {
    return Response.json(err,{status:500});
  }
}