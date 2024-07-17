import { UserStateType } from "@/type"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCookie } from "cookies-next"

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
        // const setProducts = (data: Partial<T>){}
        // const setUser = (data: Partial<T>)=>{
        //     queryClient.setQueryData([queryKey],data)
        // }
        const logoutUser = ()=>{
            const newSate:UserStateType = {
                username:"",
                token:""
            }
            deleteCookie("imt")
            queryClient.setQueryData([queryKey],newSate)
        }
        return {data,isLoading,error,logoutUser}
    }
}