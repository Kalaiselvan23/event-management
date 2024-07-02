import prisma from "@/lib/prisma";

export const PUT=async(request:Request)=>{
    try{
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const categoryId = searchParams.get("eventId") || "";
        const category = await request.json();
        const updated=await prisma.category.update({
            where:{
                id:categoryId,
            },
            data:{
                name:category.name,
            }
        })
    }
    catch(err)
    {
        return Response.json({
            msg:"Unable to update",
            err
        },{
            status:500
        })
    }
}