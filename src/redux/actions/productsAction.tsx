import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsState } from "../reducers/productsReducer";
import { ProductDataInput, ProductProp } from "@/type";
export const addProduct = createAsyncThunk('products/addProduct',async(data:{products:ProductDataInput,image:string | ArrayBuffer})=>{
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/addProduct',{
      method:'post',
      body:JSON.stringify(data)
    })
    const result = await response.json()
    return result
  })
  export const getProduct = createAsyncThunk('products/getProduct',async()=>{
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/products',{
      method:'get',
    })
    const result = await response.json()
    return result
  })
  export const deleteProduct = createAsyncThunk('products/deleteProduct',async(data:{id:string,img:string|undefined})=>{
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/products',{
      method:'delete',
      body:JSON.stringify(data)
    })
    const result = await response.json()
    return result
  })
const productsActions=(builder:ActionReducerMapBuilder<ProductsState>)=>{
    builder.addCase(addProduct.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(addProduct.fulfilled,(state,action:{payload:ProductProp})=>{
    state.isLoading=false
    const products = state.products.length?state.products:[]
    state.products=[...products,action.payload]
    })
    builder.addCase(addProduct.rejected,(state)=>{
    state.isLoading=false
    state.error='Server Error'
    })
    builder.addCase(getProduct.pending,(state)=>{
    state.isLoading=true
    })
    builder.addCase(getProduct.fulfilled,(state,action:{payload:ProductProp[]})=>{
    state.isLoading=false
    state.products=action.payload
    })
    builder.addCase(getProduct.rejected,(state)=>{
    state.isLoading=false
    state.error='Server Error'
    })
    builder.addCase(deleteProduct.pending,(state)=>{
    state.isLoading=true
    })
    builder.addCase(deleteProduct.fulfilled,(state,action)=>{
    state.isLoading=false
    const products = state.products?.filter(val=>val.id!==action.payload?.id)
    state.products=  products
    })
    builder.addCase(deleteProduct.rejected,(state)=>{
    state.isLoading=false
    state.error='Server Error'
    })
}
export default productsActions