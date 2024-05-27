import { ProductDataInput, ProductProp } from '@/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productsActions from '../actions/productsAction'



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
    productsActions(builder)
  }
})

export const { setAddProductState,setProducts } = productsSlice.actions

export default productsSlice.reducer