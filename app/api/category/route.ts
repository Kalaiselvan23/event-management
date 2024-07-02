import prisma from "@/lib/prisma";
import { CategoryType } from "@/lib/types";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories: CategoryType[] = await prisma.category.findMany({
      include:{
        events:{
          include:{
            events:{
              select:{
                name:true,
                id:true,
              }
            }
          }
        }
      }
    });
    return NextResponse.json({
      msg:"Successfully fetched Events",
      data:categories
    });
  } catch (err) {
    return NextResponse.json(err,{
      status:500,
    });
  }
};
export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    return Response.json({ msg: "Category Deleted Successfully", data: category });
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
};
