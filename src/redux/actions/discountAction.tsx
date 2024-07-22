import { DefaultTypeReducer, DiscountInputType } from "@/type";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
type DiscountStateType = DiscountInputType & DefaultTypeReducer

export const addDiscount = createAsyncThunk('products/discount',async(data:DiscountInputType)=>{
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/addDiscount',{
        method:'post',
        body:JSON.stringify(data)
      })
    const result = await response.json()
    return result
})

const discountAction = (builder:ActionReducerMapBuilder<DiscountStateType>)=>{
    builder.addCase(addDiscount.pending,(state)=>{
        state.isLoading=true
        state.error=""
    })
    builder.addCase(addDiscount.fulfilled,(state,action)=>{
        state.isLoading=false
        state.error=""
        state.discount_name=action.payload.discount_name
        state.picture=action.payload.picture
        state.valType=action.payload.valType
        state.value=action.payload.value
    })
    builder.addCase(addDiscount.pending,(state,action)=>{
        state.isLoading=true
        state.error=action.payload
    })
}

export default discountAction