import { NextRequest } from "next/server";
import prisma from '../../../lib/prisma'
import { private_scrt, res } from "@/lib/serverServices";
import { encryptJWT } from "@/lib/tokenServices";
export const POST=async (req:NextRequest)=>{
    try {
        const data = await req.json()
        const getpass = await prisma.admin.findFirst({where:{username:data.admin}}) || data.password
        const decodePass = new TextDecoder().decode(getpass?.password)
        if(data.password===decodePass){
            const token = encryptJWT({username:data.username},private_scrt)
            return res.json({token,username:data.username})
        }
        return res.json({msg:`Wrong Username or Password`})
    } catch (error) {
        return res.json({msg:`Permited Access`})
    }
}
