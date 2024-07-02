import prisma from "@/lib/prisma";
import { BookingDetailsSchema } from "../../../../lib/types";

export const POST = async (request: Request) => {
  try {
    const bookingDetails = await request.json();

    BookingDetailsSchema.parse(bookingDetails);

    const { priceClassId, userId, eventId } = bookingDetails;
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    const eventExists = await prisma.events.findUnique({ where: { id: eventId } });
    const priceClassExists = await prisma.priceClass.findUnique({ where: { id: priceClassId } });

    if (!userExists || !eventExists || !priceClassExists) {
      return new Response(
        JSON.stringify({ msg: "Invalid userId, eventId, or priceClassId" }),
        { status: 400 }
      );
    }

    const responseData = await prisma.ticket.create({
      data: {
        userId,
        eventId,
        priceClassId,
      },
    });

    return new Response(
      JSON.stringify({
        msg: "Ticket booked successfully",
        data: responseData,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({
        msg: "Error occurred while booking ticket",
        err,
      }),
      { status: 500 }
    );
  }
};
