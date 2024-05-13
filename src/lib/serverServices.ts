import { NextResponse } from "next/server";

export const res = NextResponse

export const getProducts=async()=>{
    'use server'
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/products',{
        method:'get',
    })
    const result = await response.json()
    return result
}