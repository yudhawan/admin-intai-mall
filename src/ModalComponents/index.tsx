import AddCategoryModal from "@/components/AddCategoryModal/AddCategoryModal"
import AddDiscountModal from "@/components/AddDiscountModal/AddDiscountModal"
import Loader from "@/components/Loader/Loader"
import { ModalAppProp } from "@/type"

const ModalAppList:ModalAppProp[] = [
    {
        id:'loading',
        component:<Loader/>
    },
    {
        id:'addCategoryModal',
        component:<AddCategoryModal/>
    },
    {
        id:'addDiscountModal',
        component:<AddDiscountModal/>
    },
]

export default ModalAppList