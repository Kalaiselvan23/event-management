import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { formatDate } from "../../../lib/utils";
import { EventFilterSchema } from "@/lib/types";
export const GET = async (request: Request) => {
  try {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const locationId = searchParams.get("locationId");
  const categoryId = searchParams.get("categoryId");
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  let data;
    if (locationId || categoryId || fromDate || toDate) {
      data = await prisma.events.findMany({
        include: { location: true, categories: true },
        where: {
          ...(locationId && { location: { id: locationId } }),
          ...(categoryId && { categories: { some: { categoryId } } }),
          ...(fromDate || toDate
            ? {
                date: {
                  ...(fromDate && { gte: fromDate }),
                  ...(toDate && { lte: toDate }),
                },
              }
            : {}),
        },
      });
    } else {
      data = await prisma.events.findMany({
        include: {
          location: true,
          categories: true,
          priceclass: true,
        },
      });
    }
    return Response.json({ msg: "Events Fetched Successfuly", data });
  } catch (err) {
    return Response.json({
      msg: "Unable to fetch event",
      err,
    });
  }
};


export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();
    const event = await prisma.events.delete({
      where: {
        id,
      },
    });
    return Response.json({ msg: "Event Deleted Successfully", data: event });
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
};
