'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { res } from "./argApi"
import { revalidateTag } from "next/cache"
export const getProducts=async()=>{
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/getProducts',{
            method:'get',
            headers:{
                "dude":"terrr"
            }
        })
        const result = await response.json()
        return result
        
    } catch (error) {
        return error
    }

}
export const getCategories=async()=>{
    try {
        
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/getCategories',{
            method:'get',
        })
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }
}

export const checkingTokenLoginValidation = async()=>{
    try {
        const cookie = cookies().get('imt')?.value
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/validateTokenLogin',{
            method:'post',
            body:JSON.stringify({token:cookie})
        })
        const result = await response.json()
        const status = response.status
        if(status!==200 && !result.token) {
            return {msg:"Error Authentication Token",status:405}
        }else return result
        
    } catch (error) {
        return {msg:error,status:405}
    }
}


export async function onLogin(data:{username:FormDataEntryValue,password:FormDataEntryValue}) {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/doLogin',{
        method:'post',
        body:JSON.stringify(data)
    })
    const result = await response.json()
    if(result?.token && response.status==200) {
        cookies().set('imt',result?.token)
        return redirect('/dashboard')
    }
    else res.json({msg:'Error'},{status:405})
   
}
export async function handleLogout() {
    const cookie = cookies().get('imt')?.value
    cookies().delete('imt')
    await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/doLogout',{
        method:'post',
        body:JSON.stringify({token:cookie})
    })
    return redirect('/login')
}