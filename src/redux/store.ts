import { configureStore } from '@reduxjs/toolkit'
import productSlice from './reducers/productsReducer'
import adminSlice from './reducers/adminReducers'
import userSlice from './reducers/usersReducers'

export const store = configureStore({
  reducer: {
    products:productSlice,
    admin:adminSlice,
    users:userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch