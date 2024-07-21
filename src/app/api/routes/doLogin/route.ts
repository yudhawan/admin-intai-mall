import { NextRequest } from "next/server"
import { res } from "../../libsServer/argApi"
import prisma from "@/lib/prisma"
// @ts-ignore
import bcrypt from 'bcrypt'
import { compareSync } from "bcrypt-ts";
import { encryptJWT } from "@/lib/tokenServices"
import { private_scrt } from "../../libsServer/encrypt"
export const POST =async (req: NextRequest)=>{
    try {
        const data = await req.json()
        const getPass = await prisma.admin.findFirst({where:{username:data?.username}})
        // const checkPass = await bcrypt.compare(data.password,getPass?.password)
        const checkPass = compareSync(data?.password,getPass?.password||"")
        if (checkPass) {
            const token = await encryptJWT({payload:{username:getPass?.username},scrt:private_scrt})
            await prisma.admin.update({where:{id:getPass?.id},data:{token:token}})
            return res.json({msg:'success',token:token},{status:200,statusText:'Logged In'})
        }
        return res.json({msg:'failed'},{status:405,statusText:'Failed Logged In'})
    } catch (error) {
        return res.json({msg:error},{status:405,statusText:'Failed Logged In'})
    }
}