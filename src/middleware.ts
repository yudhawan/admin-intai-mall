import middlewareServices from "./lib/middlewareServices"
export function middleware(request: Request) {
    return middlewareServices
}

// specify the path regex to apply the middleware to
// export const config = {
//     matcher: '/api/:path*',
// }