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
    console.log(categories);
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(err);
  }
};
