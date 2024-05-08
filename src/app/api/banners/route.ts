import { res } from "@/lib/serverServices";
import { NextRequest } from "next/server";
import {v2 as cloudinary} from 'cloudinary'
import prisma from "@/lib/prisma";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const POST =async (req:NextRequest)=>{
    try {
        let banners = {}
        const data = await req.json()
        console.log('tol: ',data)
        
        // const img = await cloudinary.uploader.unsigned_image_upload_tag()
        // if(img.url){
        //     data.image=img.url
        //     banners = await prisma?.banners.create({data:data})
        // }
        return res.json(banners,{status:202})
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}