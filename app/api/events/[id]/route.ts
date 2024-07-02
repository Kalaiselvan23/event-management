import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
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
