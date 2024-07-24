import { ImagesBanner, UserType } from "@/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import adminAction from "../actions/adminAction";
import { setCookie } from "cookies-next";

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