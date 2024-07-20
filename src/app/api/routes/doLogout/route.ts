import { NextRequest } from "next/server"
import { res } from "../../libsServer/argApi"
import prisma from "@/lib/prisma"
export const POST = async(req:NextRequest)=>{
    try {
        const {token} = await req.json()
        console.log(token)
        const idUnique = await prisma.admin.findFirst({where:{token:token}})
        await prisma.admin.update({where:{id:idUnique?.id},data:{token:''}})
        return res.json({msg:"Success"},{status:200, statusText:"Logged out"})
    } catch (error) {
        return res.json({msg:error},{status:405, statusText:"Failed"})
    }
}