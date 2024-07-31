'use client'
import React, { useContext, useEffect, useState } from 'react'
import InputComponent from '../../components/InputComponent/InputComponent'
import Button from '../../components/Button/Button'
import { setProducts,setCategories } from '@/redux/reducers/productsReducer'
import { useRedux } from '@/redux/useRedux'
import { ModalContext } from '@/constant/ModalContext'
import { CategoryProp, ModalContextProp, ProductProp, ProductsStateType } from '@/type'
import { MagnifyingGlassIcon, PlusIcon} from '@heroicons/react/24/outline'
import EmptyComponent from '@/components/EmptyComponent/EmptyComponent'
import Product from '@/components/Product/Product'
import { deleteProduct } from '@/redux/actions/productsAction'
import style from './ProductContainer.module.scss'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { AppDispatch } from '@/redux/store'
import {  getDataCategories, getDataProducts } from '@/query/productsQuery'
import Category from '@/components/Category/Category'
import CategoriesContainer from '../CategoriesContainer/CategoriesContainer'

function ProductContainer() {
    const {id}=useParams()
    const {data:getAllProducts,isLoading,isError} = getDataProducts()
    const {data:getAllCategories} = getDataCategories()
    const {handleIsLoading,handleModalId} = useContext(ModalContext) as ModalContextProp
    const {dispatch,selector}:{dispatch:AppDispatch, selector:ProductsStateType}= useRedux("products")
    const {products,categories,isLoading:productLoading} = selector 
    const [type,setType]=useState<string>('products')
    const [category,setCategory] = useState<string>('')
    
    function handelAddCategory(a:string) {
        console.log(a)
    }
    
    function handleDelete({id,img}:{id:string,img:string|undefined}) {
        dispatch(deleteProduct({id,img}))
    }
    useEffect(()=>{
        handleIsLoading(isLoading || productLoading)
    },[isLoading,productLoading])
    useEffect(()=>{
        dispatch(setProducts(getAllProducts))
        dispatch(setCategories(getAllCategories))
    },[getAllProducts,getAllCategories])
    
  return (
    <div className={`${style.main} w-full flex flex-col gap-4 md:gap-10 p-4 bg-gray-100`}>
        
        <div className='flex flex-col items-start justify-start gap-4'>
            <h3 className='font-bold text-3xl'>All Products</h3>
            <div className='flex flex-wrap sm:flex-row justify-start items-center gap-2'>
                <div className='flex items-center gap-2 border border-gray-500 rounded-md px-4'>
                    <InputComponent onChange={e=>{}} type='text' placeholder='search' classname='border-none rounded-none p-0 w-full' />
                    <MagnifyingGlassIcon className='w-5 h-5 text-gray-500'/>
                </div>
                <Link href={'addProduct'}  className='group flex items-center hover:bg-green-500 hover:border-green-500 p-2 border border-gray-400 bg-white rounded-md hover:text-white'>
                    <PlusIcon className='group-hover:text-white w-5 h-5 stroke-2' />
                    Product
                </Link>
                <Button onClick={()=>{
                    handleModalId('addCategoryModal')
                }} classname='group flex items-center hover:bg-orange-500 hover:border-orange-500'>
                    <PlusIcon className='group-hover:text-white w-5 h-5 stroke-2' />
                    Category
                </Button>
                <Button onClick={()=>{
                    handleModalId('addDiscountModal')
                }} classname='group flex items-center hover:bg-orange-500 hover:border-orange-500'>
                    <PlusIcon className='group-hover:text-white w-5 h-5 stroke-2' />
                    Discount
                </Button>
                
            </div>
            <div className={style.kindContainer}>
                <Link href={'all-products'} className={`${style.subLink} ${id==='all-products'?style.active:'decoration-transparent'}`}>All Products</Link>
                <Link href={'all-categories'} className={`${style.subLink} ${id==='all-categories'?style.active:'decoration-transparent'}`}>All Categories</Link>
                <Link href={'all-discount'} className={`${style.subLink} ${id==='all-discount'?style.active:'decoration-transparent'}`}>All Discount</Link>
            </div>
            {id==='all-products'&&<div className={`w-full h-full flex flex-wrap gap-4 justify-center ${!products?.length&&' items-center'}`}>
                {
                    products?.length?products.map(val=> <Product key={val.id} id={val.id} name={val.name} price={val.price} stock={val.stock} image={val.image} deleteFn={()=>handleDelete({id:val.id,img:val.image})} />):<EmptyComponent/>
                }
            </div>}
            {id==='all-categories'&&<CategoriesContainer data={categories} />}
            {id==='all-discount'&&<div className={`w-full h-full flex flex-wrap gap-4 justify-center ${!products.length&&' items-center'}`}>
                <EmptyComponent/>
                {/* {
                    products.length?products.map(val=> <Product key={val.id} id={val.id} name={val.name} price={val.price} stock={val.stock} image={val.image} deleteFn={()=>handleDelete({id:val.id,img:val.image})} />):<EmptyComponent/>
                } */}
            </div>}
        </div>
    </div>
  )
}

export default ProductContainer