import { res } from "../../libsServer/argApi";
import { NextRequest } from "next/server"
import prisma from "@/lib/prisma";
import { cloud } from "../../cloudinary_config";
export const POST = async(req: NextRequest)=>{
    const data = await req.json()
    const postData = await prisma.discount.create({data:data})
    if(data?.picture)await cloud.uploader.upload(data?.image,{folder:'discounts'})
    if(typeof postData==='object') return res.json({msg:"success"},{status:202})
    return res.json({msg:"Failed to create"},{status:405,statusText:"Failed to create"})
}