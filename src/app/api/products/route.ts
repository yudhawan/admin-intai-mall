import { res } from "@/lib/serverServices";
import { NextRequest } from "next/server";
import {v2 as cloudinary} from 'cloudinary'
import prisma from "@/lib/prisma";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const GET =async(req:NextRequest)=>{
    const products = await prisma.products.findMany()
    return res.json(products,{status:202})
}
export const POST =async (req:NextRequest)=>{
    try {
        let product = {}
        const data = await req.json()
        const img = await cloudinary.uploader.upload(data?.image,{folder:'products'})
        if(img.url){
            data.image=img.url
            product = await prisma?.products.create({data:data})
        }
        return res.json(product,{status:202})
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}