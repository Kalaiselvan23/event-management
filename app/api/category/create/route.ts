import prisma from "@/lib/prisma";
import { CategorySchema } from "@/lib/types";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export const POST=async(request:Request)=>{
    try{
        const category=await request.json();
        CategorySchema.parse(category)
        const id=uuidv4();
        const response=await prisma.category.create({
            data:{
                name:category.name
            }
        })
        return NextResponse.json({msg:"successfully created",data:response});
    }
    catch(err)
    {
        return NextResponse.json(err)
    }
}

