import React, { ReactNode, RefAttributes } from "react"

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
    category? :CategoryProp
    caregoryId? : string
    deleteFn?:()=>void
}

export type BoxMenuLinkProp={
    name:string
    badges?:number
    icon:ReactNode
    link:string
}

export type ImagesBanner = {
    src:string
    alt:string
}

export type ProductDataInput={
    name:string,
    price:string | number,
    stock:string | number,
}

export type CategoryProp={
    id:string
    name:string
    products?:ProductProp[]
}
