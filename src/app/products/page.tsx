import ProductsContainer from '@/container/ProductContainer/ProductContainer'
import { getCategories, getProducts } from '@/lib/serverServices'
import React from 'react'


async function ProductPage() {
  const getAllProducts = await getProducts()
  const getAllCategories = await getCategories()
  return <ProductsContainer allProducts={getAllProducts} allCategories={getAllCategories} />
}

export default ProductPage