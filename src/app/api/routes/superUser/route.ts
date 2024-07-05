import { NextRequest } from "next/server";
import prisma from "@/lib/prisma"
import { encryptJWT } from "@/lib/tokenServices";
import { private_scrt } from "../../libsServer/encrypt";
import { res } from "../../libsServer/argApi";
async function POST(req:NextRequest){
    try {
        const data = await req.json()
        const password = new TextEncoder().encode(data?.password)
        data.password=password
        await prisma.admin.create({data:data})
        const token = encryptJWT({username:data.username},private_scrt)
        return res.json({token,username:data.username})
    } catch (error) {
        return res.json({msg:`Permited Access`})
    }
}
