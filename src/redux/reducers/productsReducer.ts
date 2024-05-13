import { ProductDataInput, ProductProp } from '@/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const addProduct = createAsyncThunk('products/addProduct',async(data)=>{
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/products',{
    method:'post',
    body:JSON.stringify(data)
  })
  const result = await response.json()
  return result
})
export const getProduct = createAsyncThunk('products/getProduct',async()=>{
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/products',{
    method:'get',
  })
  const result = await response.json()
  return result
})
export const deleteProduct = createAsyncThunk('products/deleteProduct',async(data:{id:string,img:string|undefined})=>{
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'api/products',{
    method:'delete',
    body:JSON.stringify(data)
  })
  console.log(response)
  const result = await response.json()
  return result
})

export interface ProductsState {
  products: ProductProp[]
  cart: object[]
  addProductState:ProductDataInput
  isLoading:boolean
  error:string | object
}

const initialState: ProductsState = {
  products: [],
  cart:[],
  addProductState:{name:'',price:'',stock:''},
  isLoading:false,
  error:'',

}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAddProductState:(state,action)=>{
      state.addProductState=action.payload
    },
    setProducts:(state,action)=>{
      state.products=action.payload
    }
  },
  extraReducers:builder=>{
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
})

export const { setAddProductState,setProducts } = productsSlice.actions

export default productsSlice.reducer