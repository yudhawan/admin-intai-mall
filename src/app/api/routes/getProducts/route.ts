import { res } from "../../libsServer/argApi";;
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";


export const GET =async(req:NextRequest)=>{
    try {
        const products = await prisma.products.findMany()
        return res.json(products,{status:202})
    } catch (error) {
        console.log(error)
        return res.json(error,{status:405})
    }
}
