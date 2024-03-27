import { ProductProp } from '@/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const addProduct = createAsyncThunk('products/addProduct',async(data)=>{
  const response = await fetch('https://admin-intai-mall.vercel.app/api/products',{
    method:'post',
    body:JSON.stringify(data)
  })
  const result = await response.json()
  return result
})
export const getProduct = createAsyncThunk('products/getProduct',async()=>{
  const response = await fetch('https://admin-intai-mall.vercel.app/api/products',{
    method:'get',
  })
  const result = await response.json()
  return result
})

export interface ProductsState {
  products: ProductProp[],
  cart: object[],
  isLoading:boolean,
  error:string | object
}

const initialState: ProductsState = {
  products: [],
  cart:[],
  isLoading:false,
  error:''
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  },
  extraReducers:builder=>{
    builder.addCase(addProduct.pending,(state)=>{
      state.isLoading=true
    })
    builder.addCase(addProduct.fulfilled,(state,action:{payload:ProductProp})=>{
      state.isLoading=false
      const products = state.products 
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
  }
})

export const {  } = productsSlice.actions

export default productsSlice.reducer