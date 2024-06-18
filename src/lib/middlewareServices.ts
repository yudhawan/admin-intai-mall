import { NextResponse } from "next/server"
const allowOrigin = process.env.NODE_ENV === 'production' ? [process.env.BASE_URL, 'https://admin-intai-mall.vercel.app', 'http://localhost:3000'] : ['http://localhost:3000','https://admin-intai-mall.vercel.app']
const middlewareServices = (req: Request)=>{
    const res = NextResponse.next()
    const origin = req.headers.get('origin') || ''
    if (origin && !allowOrigin.includes(origin)) return new NextResponse(null, {
        status: 400,
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    // add the CORS headers to the response
    // res.headers.append('Access-Control-Allow-Credentials', "true")
    // res.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000') // replace this your actual origin
    // res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    // res.headers.append(
    //     'Access-Control-Allow-Headers',
    //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )
    return res
}

export default middlewareServices