import { res } from "../../libsServer/argApi";
import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"
import { cloud } from "../../cloudinary_config"
export const POST =async (req:NextRequest)=>{
    try {
        let product = {}
        const data = await req.json()
        const img = data?.image?await cloud.uploader.upload(data?.image,{folder:'products'}):{url:''}
        if(img.url && data?.image){
            data.products.image=img.url
            product = await prisma?.products.create({data:data.products})
        }
        return res.json(product,{status:202})
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}
