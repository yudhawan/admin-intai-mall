import { CategoryProp, DefaultTypeReducer, DiscountInputType, ProductDataInput, ProductProp, ProductsStateType, SetDiscountPassPropType } from '@/type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import productsActions from '../actions/productsAction'


const initialState: ProductsStateType&DefaultTypeReducer = {
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