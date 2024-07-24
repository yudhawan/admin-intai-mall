import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useRedux =(store:string )=>{
    const dispatch = useAppDispatch()
    const selector = useAppSelector(state=>state[store as keyof TypedUseSelectorHook<RootState>])
    return {
        dispatch,
        selector
    }
}