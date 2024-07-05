'use client'
import React, { useState } from 'react'
import style from './LoginContainer.module.scss'
import InputComponent from '@/components/InputComponent/InputComponent'
import { handleValidationForm } from '@/services/services'
import { onLogin } from '@/app/api/libsServer/serverServices'
function LoginContainer() {
    const [data,setData]=useState({
        username:'',
        password:''
    })
    const [validation,setValidation]= useState<string[]>([])
    const onChange = (e:React.ChangeEvent<HTMLInputElement>,key:string)=>{
        const val = e.target.value
        if(val) {
            const reValidate = validation.filter(val => val!==key)
            setValidation(reValidate)
        }else{
            setValidation(prev=>([...prev,key]))
        }
        setData(prev=>({...prev,[key]:val}))
    }
    const handleSubmit=async(formData:FormData)=> {
        const formDataLogin = {username:formData.get('username')||'',password:formData.get('password')||''}
        if(handleValidationForm(formDataLogin).length) return handleValidationForm(formDataLogin,setValidation)
        await onLogin(formDataLogin)
    }
  return (
    <div className={style.main}>
        <p className='font-bold text-2xl'>Admin I-M</p>
        <form className={style.formContainer} action={handleSubmit}>
            {Object.entries(data).map(val=>{
                return <InputComponent key={val[0]} type={val[0]==='password'?val[0]:'text'} value={val[1]} placeholder={val[0]} onChange={e=>onChange(e,val[0])} classname={validation.includes(val[0])?'border border-red-500':''} name={val[0]} />
            })}
            <button className='cursor-pointer rounded-md px-4 hover:bg-green-400 hover:text-white hover:border-green-400 border border-gray-400 max-w-[224px] h-fit' onClick={(e)=>{
                e.stopPropagation()
            }}>Login</button>
        </form>
    </div>
  )
}

export default LoginContainer