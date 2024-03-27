import React, { ReactNode, useState } from 'react'
import { ModalContext } from './ModalContext'
type modalProviderProp={
    active:boolean
    modalId:string
    isLoading:boolean
}
function ModalProvider({children}:{children:ReactNode}) {
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