import prisma from "@/lib/prisma";
import { error } from "console";
import { NextApiResponse } from "next";

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const data=await req.json();
    const user: any[] = await prisma.$queryRaw`select * from "Users" where "usernmae"=${data.email}`
    if(user.length!=0)
    {
        return Response.json(user[0])
    }
    else{
      return Response.error();
    }
  } catch (err) {
    return Response.json(err);
  }
};
