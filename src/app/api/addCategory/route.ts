import { cloud, res } from "@/lib/serverServices"
import { NextRequest } from "next/server"
import prisma from "@/lib/prisma";

export const POST =async (req:NextRequest)=>{
    try {
        let category = {}
        const data = await req.json()
        const img = data?.image?await cloud.uploader.upload(data?.image,{folder:'categories'}):{url:''}
        if(img.url && data?.image){
            data.category.image=img.url
            category = await prisma?.category.create({data:data.category})
        }
        return res.json({},{status:202})
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
    
}