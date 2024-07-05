import { res } from "../../libsServer/argApi";;
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma"
import { ImagesBanner } from "@/type";
import { cloud } from "../../cloudinary_config";


export const POST =async (req:NextRequest)=>{
    try {
        let banners = {}
        const data:ImagesBanner[] = await req.json()
        Promise.all(
            data.map((val)=>{
                return new Promise(async(resolve,reject)=>{
                    const img = await cloud.uploader.upload(val?.src,{folder:'banners'})
                    if(img.url) {
                        await prisma.banners.create({data:{
                            image:img?.url
                        }})
                        resolve(img.url)
                    }
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
        
       
        
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}