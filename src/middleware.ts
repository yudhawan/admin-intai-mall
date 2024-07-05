import { cookies } from "next/headers"
import { res } from "./app/api/libsServer/argApi"
const allowOrigin = process.env.NODE_ENV === 'production' ? [process.env.BASE_URL, 'https://admin-intai-mall.vercel.app', 'http://localhost:3000'] : ['http://localhost:3000','https://admin-intai-mall.vercel.app']
export function middleware(req: Request) {
    const origin = req.headers.get('origin') || ''
    if (origin && !allowOrigin.includes(origin)) return new res(null, {
        status: 400,
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    // cookies().set('testing','asd')
    const cookie = cookies().get('asuu')
    console.log(cookie)
    if(!cookie) return res.redirect(new URL('/login',req.url))
    return res.next()
}
export const config = {
    matcher: '/',
}
