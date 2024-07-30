import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductDataInput, ProductProp, ProductsStateType } from "@/type";

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
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/deleteproduct',{
      method:'delete',
      body:JSON.stringify(data)
    })
    const result = await response.json()
    return result
  })
  export const addCategories = createAsyncThunk('products/category',async(data:{icon:string |ArrayBuffer| null, name:string})=>{
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/routes/addCategory',{
      method:'post',
      body:JSON.stringify(data)
    })
    const result = await response.json()
    return result
  })
const productsActions=(builder:ActionReducerMapBuilder<ProductsStateType>)=>{
    [
      addProduct,
      getProduct,
      deleteProduct,
      addCategories
    ].map(val=>{
        builder.addCase(val.pending,(state)=>{
          state.isLoading=true
          state.error=""
        })
        builder.addCase(val.rejected,(state,action)=>{
          state.isLoading=false
          state.error=action.error
        })
    })
    builder.addCase(addProduct.fulfilled,(state,action:{payload:ProductProp})=>{
      state.isLoading=false
      const products = state.products.length?state.products:[]
      state.products=[...products,action.payload]
    })
    builder.addCase(getProduct.fulfilled,(state,action:{payload:ProductProp[]})=>{
      state.isLoading=false
      state.products=action.payload
    })
    builder.addCase(deleteProduct.fulfilled,(state,action)=>{
      state.isLoading=false
      const products = state.products?.filter(val=>val.id!==action.payload?.id)
      state.products=  products
    })
    builder.addCase(addCategories.fulfilled,(state,action)=>{
      state.isLoading=false
      const categoriesNew = state.categories?state.categories:[]
      state.categories= [...categoriesNew,action.payload]
    })
}
export default productsActions