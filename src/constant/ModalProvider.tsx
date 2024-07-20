import React, { ReactNode, useEffect, useState } from 'react'
import { ModalContext } from './ModalContext'
import { deleteCookie, setCookie } from 'cookies-next'
type modalProviderProp={
    active:boolean
    modalId:string
    isLoading:boolean
}
function ModalProvider({children,user}:{children:ReactNode,user:any}) {
    const [data,setData]=useState<modalProviderProp>({
        modalId:'',
        active:false,
        isLoading:false
    })
    const [getToken,setToken] = useState<string>("")
    const handleLogout = (key:string)=> {
        deleteCookie(key)
        setToken('')
    }
    const handleModalId = (val:string)=> setData(prev=>({...prev,modalId:val}))
    const handleActive = (val:boolean)=> setData(prev=>({...prev,active:val}))
    const handleIsLoading = (val:boolean)=> {
        if(val) setData({active:true,modalId:'loading',isLoading:val})
        else setData({active:false,modalId:'',isLoading:val})
    }
    useEffect(()=>{
        if(user?.token) {
            setToken(user?.token)
            setCookie("imt",user?.token)
        }
    },[user])
  return (
    <ModalContext.Provider value={{
        active:data.active,
        modalId:data.modalId,
        isLoading:data.isLoading,
        token:getToken,
        handleActive,
        handleModalId,
        handleIsLoading,
        handleLogout
    }}>
        {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider