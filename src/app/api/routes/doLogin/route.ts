import { NextRequest } from "next/server";
import { res } from "../../libsServer/argApi";

export const POST =async (req: NextRequest)=>{
    // const data = await req.json()
    return res.json({msg:'success',token:'das'},{status:200,statusText:'Logged In'})
}