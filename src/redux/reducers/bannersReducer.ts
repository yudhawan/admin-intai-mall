import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type BannersState = {
    image: File[]
    isLoading:boolean
    error:string
}
export const addBanners = createAsyncThunk('banners/addBanners',async({images}:{images:string[]})=>{
    const addBanners = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/banners',{
        method:'POST',
        body:JSON.stringify(images)
    })
    const result = await addBanners.json()
    return result
})

const initialState:BannersState={
    image:[],
    isLoading:false,
    error:''
}
export const bannersSlice = createSlice({
    name:'banners',
    initialState,
    reducers:{

    },
    extraReducers:builder=>{
        builder.addCase(addBanners.pending,(state)=>{
            state.isLoading=true
        })
    }
})