import prisma from "@/lib/prisma";
import { EventSchema } from "@/lib/types";

export const PUT = async (request: Request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const eventId = searchParams.get("eventId") || "";
  const event = await request.json();
  const { name, description, venue, locationId, categoryId, date } = event;
  try {
    EventSchema.parse({ ...event, date: new Date(date) });
    const existingEvent = await prisma.events.findUnique({
      where: { id: eventId },
    });
    if (!existingEvent) {
      return Response.json(
        {
          msg: `Event with id ${eventId} is not available`,
        },
        {
          status: 404,
        }
      );
    }
    const data = await prisma.events.update({
      where: {
        id: eventId,
      },
      data: {
        name,
        description,
        venue,
        date: new Date(date),
        location: {
          connect: {
            id: locationId,
          },
        },
      },
      include: {
        location: true,
        categories: true,
      },
    });
    return Response.json(
      {
        msg: `Successfully updated the event with id ${eventId}`,
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        msg: `Unable to update`,
        err,
      },
      {
        status: 500,
      }
    );
  }
};
