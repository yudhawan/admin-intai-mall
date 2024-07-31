import { addCategory, addProduct } from "@/app/api/libsServer/serverServices"
import { createMutation } from "./queryState"
import { MutationKey, QueryClient, QueryKey, useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from "@tanstack/react-query"
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
export function mutateAddProduct(fnmutate:any,mutationKey:string[],validation?:string[],props?:Partial<UseMutationOptions<unknown,unknown,void>>):UseMutationResult<unknown,unknown,void>{
    const queryClient = useQueryClient();
    return useMutation<unknown, unknown, void>({
        mutationFn: async(data:any)=>fnmutate(data),
        mutationKey:mutationKey,
        onSuccess:(data, variables, context) =>{
            queryClient.invalidateQueries({ queryKey: mutationKey });
            if (props?.onSuccess) {
                props.onSuccess(data, variables, context);
            }
        },
        ...props
    })
}
