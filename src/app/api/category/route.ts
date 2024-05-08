import { res } from "@/lib/serverServices";
import { NextRequest } from "next/server";

export const GET =(req:NextRequest)=>{
    return res.json({msg:'hello get'})
}
export const POST =async (req:NextRequest)=>{
    return res.json({msg:'hello get'})
    try {
        return res.json({msg:'hello post'})
    } catch (error) {
        return res.json({msg:error},{status:405})
    }
}