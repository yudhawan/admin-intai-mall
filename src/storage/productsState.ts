import { ProductProp } from "@/type";
import { createGlobalState } from ".";

const productsState:ProductProp={
    id: "",
    name: "",
    price: "",
    stock: "",
    image: "",
    desc: "",
    category: {id:"",name:""},
    caregoryId: "",
}

export const useProductsState = createGlobalState<ProductProp>("products",productsState)