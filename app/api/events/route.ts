import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
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
    const formattedFromDate = new Date(fromDate)
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");
    const formattedToDate = new Date(toDate)
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");
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
