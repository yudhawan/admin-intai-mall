import { res } from "@/lib/serverServices";
import { NextRequest } from "next/server";
import {v2 as cloudinary} from 'cloudinary'
import prisma from "@/lib/prisma";
import { ImagesBanner } from "@/type";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const POST =async (req:NextRequest)=>{
    try {
        let banners = {}
        const data:ImagesBanner[] = await req.json()
        Promise.all(
            data.map((val)=>{
                return new Promise(async(resolve,reject)=>{
                    const img = await cloudinary.uploader.upload(val?.src,{folder:'banners'})
                    if(img.url) resolve(img.url)
                    else reject('cannot upload images')
                })
            })
        
        )
        .then(()=>{
            return res.json({message:'created'},{status:202})
        })
        .catch(()=>{
            return res.error()
        })
        
        // const img = await cloudinary.uploader.unsigned_image_upload_tag()
        // if(img.url){
        //     data.image=img.url
        //     banners = await prisma?.banners.create({data:data})
        // }
        
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}