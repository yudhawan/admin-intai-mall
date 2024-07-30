import { addCategory, addProduct } from "@/app/api/libsServer/serverServices"
import { createMutation } from "./queryState"
import { UseMutationResult } from "@tanstack/react-query"
import { ProductDataInput } from "@/type";

export function mutateAddCategory(data:{
    icon: string | ArrayBuffer | null;
    name: string;
}):UseMutationResult{
    const mutate=createMutation({
        mutatefn:async()=>addCategory(data),
        mutatekey:["addCategory"],
        validate:["getCategories"]
      })
    return mutate
}
export function mutateAddProduct(data:{
    products: ProductDataInput;
    image: string | ArrayBuffer;
}):UseMutationResult{
    const mutate=createMutation({
        mutatefn:async()=>addProduct(data),
        mutatekey:["addCategory"],
        validate:["getCategories"]
      })
    return mutate
}