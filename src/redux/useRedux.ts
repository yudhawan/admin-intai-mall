import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useRedux =<T extends keyof RootState>(store:T )=>{
    const dispatch = useAppDispatch()
    const selector = useAppSelector(state=>state[store])
    return {
        dispatch,
        selector
    }
}