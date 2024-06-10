'use client'
import React, { useContext, useEffect, useState } from 'react'
import InputComponent from '../../components/InputComponent/InputComponent'
import Button from '../../components/Button/Button'
import { setProducts,setCategories } from '@/redux/reducers/productsReducer'
import { useRedux } from '@/redux/useRedux'
import { ModalContext } from '@/constant/ModalContext'
import { CategoryProp, ModalContextProp, ProductProp } from '@/type'
import { MagnifyingGlassIcon, PlusIcon} from '@heroicons/react/24/outline'
import EmptyComponent from '@/components/EmptyComponent/EmptyComponent'
import Product from '@/components/Product/Product'
import style from './ProductContainer.module.scss'
import { deleteProduct } from '@/redux/actions/productsAction'

function ProductContainer({allProducts,allCategories}:{allProducts:ProductProp[],allCategories:CategoryProp[]}) {
    const {handleIsLoading,handleModalId} = useContext(ModalContext) as ModalContextProp
    const {dispatch,selector}= useRedux()
    const {isLoading,products} = selector(state=>state.products)
    const [type,setType]=useState<string>('products')
    const [category,setCategory] = useState<string>('')
    
    function handelAddCategory() {
        console.log(category)
    }
    function handleDelete({id,img}:{id:string,img:string|undefined}) {
        dispatch(deleteProduct({id,img}))
    }
    useEffect(()=>{
        handleIsLoading(isLoading)
    },[isLoading])
    useEffect(()=>{
        dispatch(setProducts(allProducts))
        dispatch(setCategories(allCategories))
    },[allProducts])
  return (
    <div className={`${style.main} w-full flex flex-col gap-4 md:gap-10 p-4 bg-gray-100`}>
        
        <div className='flex flex-col items-start justify-start gap-4'>
            <h3 className='font-bold text-3xl'>All Products</h3>
            <div className='flex flex-wrap sm:flex-row justify-start items-center gap-2'>
                <div className='flex items-center gap-2 border border-gray-500 rounded-md px-4'>
                    <InputComponent onChange={e=>{}} type='text' placeholder='search' classname='border-none rounded-none p-0 w-full' />
                    <MagnifyingGlassIcon className='w-5 h-5 text-gray-500'/>
                </div>
                <Button onClick={()=>{
                    handleModalId('addProductModal')
                }} classname='group flex items-center hover:bg-green-500 hover:border-green-500'>
                    <PlusIcon className='group-hover:text-white w-5 h-5 stroke-2' />
                    Product
                </Button>
                <Button onClick={()=>{
                    handleModalId('addCategoryModal')
                }} classname='group flex items-center hover:bg-orange-500 hover:border-orange-500'>
                    <PlusIcon className='group-hover:text-white w-5 h-5 stroke-2' />
                    Category
                </Button>
                
            </div>
            
            <div className='w-full flex gap-2 flex-wrap'>
                <Button onClick={()=>setType('products')} classname={`${type=='products'&& 'bg-gray-500 hover:text-white'}`}>All Products</Button>
                <Button onClick={()=>setType('categories')} classname={`${type=='categories'&& 'bg-gray-500 hover:text-white'}`}>All Categories</Button>
            </div>
            {type==='products'&&<div className={`w-full h-full flex flex-wrap gap-4 justify-center ${!products.length&&' items-center'}`}>
                {
                    products.length?products.map(val=> <Product key={val.id} id={val.id} name={val.name} price={val.price} stock={val.stock} image={val.image} deleteFn={()=>handleDelete({id:val.id,img:val.image})} />):<EmptyComponent/>
                }
            </div>}
            {type==='categories'&&<div className={`w-full h-full flex flex-wrap gap-4 justify-center ${!products.length&&' items-center'}`}>
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