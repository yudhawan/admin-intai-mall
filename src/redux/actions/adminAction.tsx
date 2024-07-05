import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductDataInput, ProductProp } from "@/type";
import { AdminState } from "../reducers/adminReducers";
export const loginAction = createAsyncThunk('admin/loginAction',async(data:{username:string,password:string})=>{
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/products',{
      method:'post',
      body:JSON.stringify(data)
    })
    const result = await response.json()
    return result
  })
const adminAction=(builder:ActionReducerMapBuilder<AdminState>)=>{
    builder.addCase(loginAction.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(loginAction.fulfilled,(state,action:{payload:ProductProp})=>{
        state.isLoading=false
    })
    builder.addCase(loginAction.rejected,(state)=>{
        state.isLoading=false
        state.error='Server Error'
    })
    
}
export default adminAction