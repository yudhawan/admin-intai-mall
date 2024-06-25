import { NextResponse } from "next/server";
// import {v2} from 'cloudinary'

// v2.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });
// export const cloud = v2
export const res = NextResponse

export const public_scrt = new TextEncoder().encode(process.env.PUBLIC_KEY)
export const private_scrt = new TextEncoder().encode(process.env.PRIVATE_KEY)

export const getProducts=async()=>{
    'use server'
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/getProducts',{
        method:'get',
    })
    const result = await response.json()
    return result
}
export const getCategories=async()=>{
    'use server'
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/getCategories',{
        method:'get',
    })
    const result = await response.json()
    return result
}

export const checkingTokenLoginValidation = async()=>{
    'use server'
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/validateTokenLogin',{
        method:'post'
    })
    const result = await response.json()
    if(result.status===200) return !!result
    return false
}