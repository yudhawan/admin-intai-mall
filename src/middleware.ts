import { NextResponse } from "next/server"
const allowOrigin = process.env.NODE_ENV === 'production' ? [process.env.BASE_URL, 'https://admin-intai-mall.vercel.app', 'http://localhost:3000'] : ['http://localhost:3000','https://admin-intai-mall.vercel.app']
export function middleware(req: Request) {
    const res = NextResponse.next()
    const origin = req.headers.get('origin') || ''
    if (origin && !allowOrigin.includes(origin)) return new NextResponse(null, {
        status: 400,
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    return res
}

// specify the path regex to apply the middleware to
// export const config = {
//     matcher: '/api/:path*',
// }