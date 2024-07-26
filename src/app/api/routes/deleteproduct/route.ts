import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { res } from "../../libsServer/argApi";
import { cloud } from "../../cloudinary_config"
export const DELETE = async (req:NextRequest)=>{
    try {
        const data = await req.json()
        const imgId = data?.img.split('/')
        const imgDirId='products'
        const imgPubId = imgId[imgId.length-1].split('.')[0]
        const product = await prisma.products.delete({where:{
            id:data.id
        }})
        cloud.uploader.destroy(`${imgDirId}/${imgPubId}`,{resource_type:'image'}).then(a=>console.log(a))
        return res.json(product,{status:202})
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}