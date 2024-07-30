import { MutationFunction, MutationKey, QueryFunction, QueryKey, UseMutateFunction, useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query"

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