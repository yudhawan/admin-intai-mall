import { decryptJWT } from "@/lib/tokenServices";
import { NextRequest } from "next/server";
import { private_scrt } from "../../libsServer/encrypt";
import { res } from "../../libsServer/argApi";
import prisma from "@/lib/prisma";

export const POST = async(req:NextRequest)=>{
    const data = await req.json()
    const checkingUser = await prisma.admin.findFirst({where:{token:data?.token},select:{username:true,token:true,id:true}})
    if(!checkingUser) return res.json({msg:'Bad Token',token:''},{status:401, statusText:"Token ngawur"})
    const {payload,protectedHeader}:any = await decryptJWT(data?.token, private_scrt)
    if(payload?.username!==checkingUser.username) return res.json({msg:'Expired token',token:''},{status:401, statusText:"Token expired"})
    return res.json({msg:'success',...checkingUser},{status:200})
}