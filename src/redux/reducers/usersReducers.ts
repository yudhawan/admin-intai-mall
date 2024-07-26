import { UserType } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type AdminState = {
    user:UserType[],
    token:string,
    isLoading:boolean
    error:string
}

const initialState:AdminState={
    user:[],
    token:'',
    isLoading:false,
    error:''
}
export const usersSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUsers:(state,action:PayloadAction<UserType[]>)=>{
            state.user=action.payload
        }
    },
    
})

export const {setUsers} = usersSlice.actions

export default usersSlice.reducer