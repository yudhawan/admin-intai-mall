import { CategoryProp, DefaultTypeReducer, DiscountInputType, ProductDataInput, ProductProp } from '@/type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import productsActions from '../actions/productsAction'

interface DiscountPassPropType{
  [key:string]:string|number
}
interface SetDiscountPassPropType{
  key:string
  value:string|number
}


export interface ProductsState {
  products: ProductProp[]
  categories:CategoryProp[]
  cart: object[]
  addProductState:ProductDataInput
  addDiscountState:DiscountPassPropType&DefaultTypeReducer
  isLoading:boolean
  error:string | object
}

const initialState: ProductsState&DefaultTypeReducer = {
  products: [],
  cart:[],
  categories:[],
  addProductState:{name:'',price:'',stock:''},
  addDiscountState:{},
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
    setDiscount:(state,action:PayloadAction<SetDiscountPassPropType>)=>{
      state.addDiscountState[action.payload.key]=action.payload.value
    }
  },
  extraReducers:builder=>{
    productsActions(builder)

  }
})

export const { setAddProductState,setProducts,setCategories,setDiscount } = productsSlice.actions

export default productsSlice.reducer