import { UserStateType } from "@/type";
import { createGlobalState } from ".";

const usersState = {
    username:"",
    token:""
}
export const useUserState = createGlobalState<UserStateType>("user",usersState)
// export function useUserState<T>() {
//     const global = createGlobalState<UserStateType>("user",usersState)
//     const setUser = (data: Partial<T>)=>{
//         queryClient.setQueryData(["user"],data)
//     }
//     return {setUser,...global}
// }