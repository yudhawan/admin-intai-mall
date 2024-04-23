import { ReactNode } from "react"

export type ModalContextProp={
    modalId:string
    active:boolean
    isLoading?:boolean
    handleModalId:(val:string)=>void
    handleActive:(val:boolean)=>void
    handleIsLoading:(val:boolean)=>void
}

export type ModalAppProp={
    id:string
    component:ReactNode
}

export type ProductProp={
    id: string
    name: string
    price: string
    stock: string
    image?: string
    desc?: string
    category? :object
    caregoryId? : string
    deleteFn?:()=>void
}