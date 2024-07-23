import ProductsContainer from '@/container/ProductContainer/ProductContainer'
import { getCategories, getProducts } from '../../api/libsServer/serverServices'


async function ProductPage() {
  const getAllProducts = await getProducts()
  const getAllCategories = await getCategories()
  return <ProductsContainer getAllProducts={getAllProducts} getAllCategories={getAllCategories} />
}

export default ProductPage