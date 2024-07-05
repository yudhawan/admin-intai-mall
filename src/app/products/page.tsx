import ProductsContainer from '@/container/ProductContainer/ProductContainer'
import React from 'react'
import { getCategories, getProducts } from '../api/libsServer/serverServices'


async function ProductPage() {
  const getAllProducts = await getProducts()
  const getAllCategories = await getCategories()
  return <ProductsContainer allProducts={getAllProducts} allCategories={getAllCategories} />
}

export default ProductPage