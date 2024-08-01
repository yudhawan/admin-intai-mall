import { DefaultTypeReducer, DiscountInputType, ProductsStateType, SetDiscountPassPropType } from '@/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import productsActions from '../actions/productsAction'


const initialState: ProductsStateType&DefaultTypeReducer = {
  products: [],
  cart:[],
  categories:[],
  discounts:[],
  addProductState:{name:'',price:'',stock:''},
  addDiscountState:{discount_name:'',valType:'%',value:0},
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
    setDiscount:(state,action)=>{
      state.discounts=action.payload
    },
    setDiscountState:(state,action:PayloadAction<SetDiscountPassPropType>)=>{
      // @ts-ignore
      state.addDiscountState[action.payload.key]=action.payload.value
    }
  },
  extraReducers:builder=>{
    productsActions(builder)

  }
})

export const { setAddProductState,setProducts,setCategories,setDiscount,setDiscountState } = productsSlice.actions

export default productsSlice.reducer