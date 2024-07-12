import { configureStore } from '@reduxjs/toolkit'
import productSlice from './reducers/productsReducer'
import adminSlice from './reducers/adminReducers'

export const store = configureStore({
  reducer: {
    products:productSlice,
    user:adminSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch