'use client'
import React, { useContext, useEffect, useState } from 'react'
import InputComponent from '../../components/InputComponent/InputComponent'
import { handleValidationForm } from '../../services/services'
import Button from '../../components/Button/Button'
import { addProduct, deleteProduct, setProducts } from '@/redux/reducers/productsReducer'
import { useRedux } from '@/redux/useRedux'
import { ModalContext } from '@/constant/ModalContext'
import { ModalContextProp, ProductDataInput } from '@/type'
import { MagnifyingGlassIcon, PlusIcon} from '@heroicons/react/24/outline'
import EmptyComponent from '@/components/EmptyComponent/EmptyComponent'
import Product from '@/components/Product/Product'
import style from './ProductContainer.module.scss'

function ProductsContainer({allProducts}:{allProducts:any}) {
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
    },[allProducts])
    console.log(allProducts)
  return (
    <div className={`${style.main} w-full flex flex-col gap-4 md:gap-10 p-4 bg-gray-100`}>
        
        <div className='flex flex-col items-start justify-start gap-4'>
            <h3 className='font-bold text-3xl'>All Products</h3>
            <div className='flex flex-wrap sm:flex-row justify-start items-center gap-2'>
                <div className='flex items-center gap-2 border border-gray-500 rounded-md px-4'>
                    <InputComponent onChange={e=>{}} type='text' placeholder='search' classname='border-none rounded-none p-0 w-full' />
                    <MagnifyingGlassIcon className='w-5 h-5 text-gray-500'/>
                </div>
                <form action={handelAddCategory} className='flex items-center gap-2 border border-gray-500 rounded-md px-4 pr-1'>
                    <InputComponent onChange={e=> setCategory(e.target.value)} type='text' placeholder='Add Category' classname='border-none rounded-none p-0 w-full' value={category} />
                    <Button onClick={handelAddCategory} classname='!p-none hover:!bg-transparent border-none !bg-transparent'> <PlusIcon className='w-5 h-5 text-gray-500'/></Button>
                </form>
                <Button onClick={()=>{
                    handleModalId('addProductModal')
                }} classname='group flex items-center hover:bg-green-500 hover:border-green-500'>
                    <PlusIcon className='group-hover:text-white w-5 h-5 stroke-2' />
                    Add Product
                </Button>
            </div>
            {/* {showAdd&&<div className={`w-full h-fit flex flex-wrap lg:flex-row lg:justify-evenly gap-4 justify-center relative py-5`}>
                <Button classname='absolute w-fit h-fit border-none -bottom-5 right-[50% - 140px] p-0 hover:bg-transparent flex items-center gap-2' onClick={()=>setShowAdd(false)}>
                    <ChevronUpIcon className='w-5 stroke-2 text-green-500'/>
                    <span className='text-green-500 text-sm'>Hide this section</span>
                </Button>
                <form className='gap-3 flex flex-col'>
                    <h2 className='text-xl font-bold'>Add Product</h2>
                    {
                        Object.keys(data).filter(val=>val!=='image').map(val=> <InputComponent key={val} type={val==='stock'?'number':'text'} onChange={e=> handleInput(e.target.value,val)} value={data[val as keyof dataInput]} placeholder={val} classname={`${validation.includes(val)&&'!border-red-500'}`} />)
                    }
                    <InputComponent type={'file'} accept='image/*' onChange={e=> {
                        const file = e.target.files
                        if(file?.length){
                            setPreview(URL.createObjectURL(file[0]))
                            setImage(file)
                        }
                    }}  />
                    <Button onClick={handleSubmit}>submit</Button>
                </form>
                <div className='w-72 h-auto p-2 flex flex-col border border-gray-400 rounded-lg'>
                    <Image src={preview?preview:'https://placehold.co/280x280?text=Image'} className='w-full h-52 object-contain' alt='img' width={280} height={280} />
                    {data.price&&<h2 className='capitalize font-bold'>{numberFormatMoney(+data.price)}</h2>}
                    {data.name&&<h2 className='capitalize font-semibold line-clamp-1'>{data.name}</h2>}
                    {data.stock&&<span className='capitalize text-sm mt-2'>stock : {data.stock}</span>}
                </div>
            </div>} */}
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

export default ProductsContainer