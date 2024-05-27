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
    try {
        const products = await prisma.products.findMany()
        return res.json(products,{status:202})
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}
export const POST =async (req:NextRequest)=>{
    try {
        let product = {}
        const data = await req.json()
        const img = data?.image?await cloudinary.uploader.upload(data?.image,{folder:'products'}):{url:''}
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
export const DELETE = async (req:NextRequest)=>{
    try {
        const data = await req.json()
        const imgId = data?.img.split('/')
        const imgDirId=imgId[imgId.length-2]
        const imgPubId = imgId[imgId.length-1].split('.')[0]
        const product = await prisma.products.delete({where:{
            id:data.id
        }})
        cloudinary.uploader.destroy(`${imgDirId}/${imgPubId}`,{resource_type:'image'}).then(a=>console.log(a))
        console.log(product)
        return res.json(product,{status:202})
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}