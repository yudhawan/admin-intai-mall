import { res } from "@/lib/serverServices";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export const GET =async(req:NextRequest)=>{
    try {
        const categories = await prisma.category.findMany()
        return res.json(categories,{status:202})
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}
