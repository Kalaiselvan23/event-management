import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z, string } from "zod";
import { EventSchema } from "../../../../lib/types";
import { formatDate } from "@/lib/utils";
import Page from "../../../admin/event-categories/page";
export const POST = async (request: Request) => {
  try {
    const event = await request.json();
    event.date = new Date(event.date);
    EventSchema.parse(event);
    const { name, description, date, venue } = event;
    const locationId: string = event.locationId;
    const categoryId: string = event.categoryId;
    const formattedDate = date.toISOString();
    const data = await prisma.events.create({
      data: {
        name,
        description,
        date: formattedDate,
        location: {
          connect: {
            id: locationId,
          },
        },
        venue,
        categories:{
          create:{
            category:{
              connect:{
                id:categoryId
              }
            }
          }
        }
      },
    });

    return Response.json({ msg: "Successfully posted" });
  } catch (err) {
    return Response.json(
      { err },
      {
        status: 500,
      }
    );
  }
};
