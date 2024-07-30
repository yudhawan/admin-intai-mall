import { getCategories, getProducts } from "@/app/api/libsServer/serverServices";
import { useMutation } from "@tanstack/react-query";
import { createQueryStorage } from "./queryState";

export const queryAddProducts =()=> useMutation({
    mutationKey:['products'],
    mutationFn:async()=>{
    },
    onSuccess:()=>{
        // queryClient.invalidateQueries({queryKey:['getProducts']})
    }
    
})

export const getDataProducts = createQueryStorage(null,['getProducts'],async()=>{
    const data = await getProducts()
    return data
})
export const getDataCategories = createQueryStorage(null,['getCategories'],async()=>{
    const data = await getCategories()
    return data
})
