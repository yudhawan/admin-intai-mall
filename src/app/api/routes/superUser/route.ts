import { NextRequest } from "next/server";
import prisma from "@/lib/prisma"
import { res } from "../../libsServer/argApi";
// @ts-ignore
import bcrypt from 'bcrypt'
export async function POST(req:NextRequest){
    // try {
    //     const data = await req.json()
    //     const password = await bcrypt.hash(data.password,10)
    //     data.password=password
    //     const result = await prisma.admin.create({data:data})
    //     return res.json({token:'',...result})
    // } catch (error) {
    //     return res.json({msg:`Permited Access`})
    // }
}
