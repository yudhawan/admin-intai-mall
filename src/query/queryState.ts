import { QueryFunction, useQuery } from "@tanstack/react-query"

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
