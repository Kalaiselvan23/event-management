import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export const GET = async (request: NextApiRequest, { params }: any) => {
  const { id } = params;
  try {
    // const data:CategoryType[]=await prisma.$queryRaw`select "Events".*,"Location".name as "locationName" from "Events" inner join "Location" on "Events"."locationId"="Location".id where "Events".id=${id}`
    const data = await prisma.events.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
        location: true,
        users: true,
        priceclass: true,
      },
    });
    return Response.json({ msg: "Successfully fetched event", data });
  } catch {
    return Response.json({
      msg: "Unable to fetch event",
    });
  }
};
