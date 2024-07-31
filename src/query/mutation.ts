import { addCategory, addProduct } from "@/app/api/libsServer/serverServices"
import { createMutation } from "./queryState"
import { QueryKey, useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { ProductDataInput } from "@/type";

interface AddProductQueryType{
    products: ProductDataInput;
    image: string | ArrayBuffer;
    validate?: QueryKey
}
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
export function mutateAddProduct(props?:Partial<UseMutationOptions<unknown,unknown,AddProductQueryType>>):UseMutationResult<unknown,unknown,AddProductQueryType>{
    const queryClient = useQueryClient();
    return useMutation<unknown, unknown, AddProductQueryType>({
        mutationFn: async(data:AddProductQueryType)=>addProduct(data),
        mutationKey:["addProduct"],
        onSuccess:(data, variables, context) =>{
            queryClient.invalidateQueries({ queryKey: variables.validate });
            if (props?.onSuccess) {
                props.onSuccess(data, variables, context);
            }
        },
        ...props
    })
}