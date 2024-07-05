import { NextRequest } from "next/server";
import { res } from "../../libsServer/argApi";

export const POST =async (req: NextRequest)=>{
    const data = await req.json()
    console.log(req)
    return res.json({msg:'success'},{status:200})
}