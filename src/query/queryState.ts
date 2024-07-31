import { MutationFunction, MutationKey, QueryFunction, QueryKey, UseMutateFunction, useMutation, UseMutationOptions, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query"

export function createQueryStorage<T>(state:T,key:unknown[],qfn:QueryFunction){
    return ()=>{
        const query = useQuery({
            queryKey:key,
            queryFn:qfn,
            refetchIntervalInBackground:false,
            refetchOnMount:false,
            refetchOnWindowFocus:false
        })
        return {...query}
    }
}
export function createMutation({mutatefn,mutatekey,validate}:{mutatefn:UseMutateFunction<unknown,void>,mutatekey:MutationKey,validate:QueryKey}):UseMutationResult{
    // const queryClient = useQueryClient()
    const mutate= useMutation({
        mutationKey:mutatekey,
        mutationFn:async()=>mutatefn,
        onSuccess:()=>{
            // queryClient.invalidateQueries({queryKey:validate})
        }
        
    })
    return {...mutate as UseMutationResult}
}

export function useMutationFunction(key:QueryKey,funcAPi:Promise<any>,options?:Partial<UseMutationOptions<unknown,unknown>>):UseMutationResult<unknown,unknown,void,unknown>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:async()=> funcAPi,
        mutationKey:key,
        onSuccess(data, variables:any, context) {
            queryClient.invalidateQueries({queryKey: variables?.validate})
            if(options?.onSuccess) options.onSuccess(data,variables,context)
        },
        ...options
    })
}