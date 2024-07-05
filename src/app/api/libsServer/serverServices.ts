'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const getProducts=async()=>{
    'use server'
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/getProducts',{
        method:'get',
    })
    const result = await response.json()
    return result
}
export const getCategories=async()=>{
    'use server'
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/getCategories',{
        method:'get',
    })
    const result = await response.json()
    return result
}

export const checkingTokenLoginValidation = async()=>{
    'use server'
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/validateTokenLogin',{
        method:'post'
    })
    const result = await response.json()
    if(result.status===200) return !!result
    return false
}


export async function onLogin(data:{username:FormDataEntryValue,password:FormDataEntryValue}) {
    cookies().set('asuu','mmk')
    try {
        // const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/dologin',{
        //     method:'post',
        //     body:JSON.stringify({asu:'sadda'})
        // })
        // return []
    } catch (error) {
        console.log('ngeror loh : ',error)
    }
    // const result = await response.json()
    // if(result.status===200) return !!result
    // return false
    redirect('/products')
}