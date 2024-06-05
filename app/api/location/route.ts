import prisma from "@/lib/prisma"

export const GET=async()=>{
    try{
        const locations=await prisma.$queryRaw`SELECT * FROM "Location"`
        console.log(locations); 
        return Response.json(locations);
    }
    catch(err)
    {
        return Response.json(err)
    }
}