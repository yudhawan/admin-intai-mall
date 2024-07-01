import { ImagesBanner } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminAction from "../actions/adminAction";

export type AdminState = {
    user:{
        username:string,
        password:string
    },
    token:string,
    isLoading:boolean
    error:string
}
export const loginAdmin = createAsyncThunk('admin/loginAdmin',async({images}:{images:ImagesBanner[]})=>{
    const loginAdmin = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/banners',{
        method:'POST',
        body:JSON.stringify(images)
    })
    const result = await loginAdmin.json()
    return result
})

const initialState:AdminState={
    user:{
        username:'',
        password:''
    },
    token:'',
    isLoading:false,
    error:''
}
export const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{

    },
    extraReducers:builder=>{
        adminAction(builder)
    }
})