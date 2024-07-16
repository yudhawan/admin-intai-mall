import { UserStateType } from "@/type";
import { createGlobalState } from ".";


export const useUserState = createGlobalState<UserStateType>("user",{username:'',token:''})