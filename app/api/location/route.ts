import prisma from "@/lib/prisma"

export const GET=async()=>{
    try{
        const locations=await prisma.$queryRaw`SELECT * FROM "Location"`
        return Response.json({
            msg:"Location successfully fetched",
            data:locations
        });
    }
    catch(err)
    {
        return Response.json(err)
    }
}