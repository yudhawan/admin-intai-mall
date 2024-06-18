import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary'
import { encryptJWT, generateToken } from "./tokenServices";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const cloud = cloudinary
export const res = NextResponse

export const getProducts=async()=>{
    'use server'
    const scrt = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
      )
    const token = await encryptJWT({exp:6,'username': 'yasha'},scrt)
    console.log('generated: ',token)
    
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