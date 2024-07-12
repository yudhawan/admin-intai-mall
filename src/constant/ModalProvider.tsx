import React, { ReactNode, useEffect, useState } from 'react'
import { ModalContext } from './ModalContext'
import { useRedux } from '@/redux/useRedux'
import { setCookieToken } from '@/redux/reducers/adminReducers'
import { useRouter } from 'next/navigation'
type modalProviderProp={
    active:boolean
    modalId:string
    isLoading:boolean
}
function ModalProvider({children,user}:{children:ReactNode,user:{token:string}}) {
    const {dispatch,selector} = useRedux()
    dispatch(setCookieToken(user?.token))
    const router=useRouter()
    const [data,setData]=useState<modalProviderProp>({
        modalId:'',
        active:false,
        isLoading:false
    })
    const handleModalId = (val:string)=> setData(prev=>({...prev,modalId:val}))
    const handleActive = (val:boolean)=> setData(prev=>({...prev,active:val}))
    const handleIsLoading = (val:boolean)=> {
        if(val) setData({active:true,modalId:'loading',isLoading:val})
        else setData({active:false,modalId:'',isLoading:val})
    }
    useEffect(()=>{
        if(!user.token) router.push('/login')
    },[user])
  return (
    <ModalContext.Provider value={{
        active:data.active,
        modalId:data.modalId,
        isLoading:data.isLoading,
        handleActive,
        handleModalId,
        handleIsLoading
    }}>
        {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider