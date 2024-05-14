import AddCategoryModal from "@/components/AddCategoryModal/AddCategoryModal"
import AddProductModal from "@/components/AddProductModal/AddProductModal"
import Loader from "@/components/Loader/Loader"
import { ModalAppProp } from "@/type"

const ModalAppList:ModalAppProp[] = [
    {
        id:'loading',
        component:<Loader/>
    },
    {
        id:'addProductModal',
        component:<AddProductModal/>
    },
    {
        id:'addCategoryModal',
        component:<AddCategoryModal/>
    },
]

export default ModalAppList