'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { res } from "./argApi"

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
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/doLogin',{
            method:'post',
            // body:JSON.stringify({asu:'sadda'})
        })
        const result = await response.json()
        console.log(result.token)
        if(result?.token && response.status!==200) {
            cookies().set('imt',result?.token)
            redirect('/')
        }
        else res.json({msg:'Error'},{status:405})
    } catch (error) {
        console.log('ngeror loh : ',error)
    }
}