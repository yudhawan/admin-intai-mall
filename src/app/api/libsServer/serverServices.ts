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
    console.log(result)
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
    const cookie = cookies().get('imt')?.value
    if(cookie){
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/validateTokenLogin',{
            method:'post',
            body:JSON.stringify({token:cookie})
        })
        const result = await response.json()
        const status = await response.status
        if(status!==200 && !result.token) {
            return redirect('/login')
        }
    }else return redirect('/login')
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