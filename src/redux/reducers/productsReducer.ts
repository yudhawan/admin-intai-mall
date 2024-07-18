import { CategoryProp, DiscountInputType, ProductDataInput, ProductProp } from '@/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productsActions from '../actions/productsAction'



export interface ProductsState {
  products: ProductProp[]
  categories:CategoryProp[]
  cart: object[]
  addProductState:ProductDataInput
  addDiscountState:DiscountInputType
  isLoading:boolean
  error:string | object
}

const initialState: ProductsState = {
  products: [],
  cart:[],
  categories:[],
  addProductState:{name:'',price:'',stock:''},
  addDiscountState:{discount_name:'',picture:'',value:0,valType:''},
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
    },
    setCategories:(state,action)=>{
      state.categories=action.payload
    },
    setDiscount:(state,{payload}:{payload:{key:string,value:string|number}})=>{
      // @ts-ignore
      state.addDiscountState[payload.key]=payload.value
    }
  },
  extraReducers:builder=>{
    productsActions(builder)
  }
})

export const { setAddProductState,setProducts,setCategories,setDiscount } = productsSlice.actions

export default productsSlice.reducer