import ProductsContainer from '@/container/ProductContainer/ProductContainer'
import { getProducts } from '@/lib/serverServices'
import React from 'react'


async function ProductPage() {
  const getAllProducts = await getProducts()
  return <ProductsContainer allProducts={getAllProducts} />
}

export default ProductPage