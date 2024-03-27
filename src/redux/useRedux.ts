import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useRedux =()=>{
    const dispatch = useAppDispatch()
    const selector = useAppSelector
    return {
        dispatch,
        selector
    }
}