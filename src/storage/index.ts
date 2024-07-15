import { useQuery, useQueryClient } from "@tanstack/react-query"

export function createGlobalState<T>(queryKey:unknown, initialState:T | null = null) {
    return ()=>{
        const queryClient = useQueryClient()
        const {data,isLoading,error} = useQuery({
            queryKey:[queryKey],
            queryFn:()=> Promise.resolve(initialState),
            refetchInterval:false,
            refetchIntervalInBackground:false,
            refetchOnMount:false,
            refetchOnWindowFocus:false,
            refetchOnReconnect:false
        })
        const setUser = (data: Partial<T>)=>{
            queryClient.setQueryData([queryKey],data)
        }
        return {data,isLoading,error,setUser}

    }
}