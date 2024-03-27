'use client'
import React, { useContext, useEffect, useState } from 'react'
import InputComponent from '../components/InputComponent'
import { handleValidationForm, numberFormatMoney } from '../lib/services'
import Button from '../components/Button'
import { addProduct, getProduct } from '@/redux/reducers/products'
import { useRedux } from '@/redux/useRedux'
import { ModalContext } from '@/constant/ModalContext'
import { ModalContextProp } from '@/type'
import {ChevronUpIcon, MagnifyingGlassIcon, PlusIcon} from '@heroicons/react/24/outline'
import EmptyComponent from '@/components/EmptyComponent'
import Product from '@/components/Product'

type dataInput={
    name:string,
    price:string | number,
    stock:string | number,
}
function ProductsContainer() {
    const {handleIsLoading} = useContext(ModalContext) as ModalContextProp
    const {dispatch,selector}= useRedux()
    const {isLoading,products} = selector(state=>state.products)
    const [data,setData]=useState<dataInput>({
        name:'',
        price:'',
        stock:'',
    })
    const [showAdd,setShowAdd]=useState<boolean>(false)
    const [image,setImage]=useState<any>()
    const [preview,setPreview]=useState<string | undefined>('')
    const [validation,setValidation] = useState<string[]>([])
    function handleInput(value:string|FileList,key:string) {
        if(value) setValidation(validation.filter(val=>val!==key))
        if(!value) setValidation(prev=>([...prev,value]))
        setData((prev)=>({...prev,[key]:value}))
    }
    function handleSubmit(e:React.MouseEvent) {
        e.preventDefault()
        if(handleValidationForm(data).length) return setValidation(handleValidationForm(data))
        let reader = new FileReader()
        reader.readAsDataURL(image[0])
        reader.onload=async function () {
            // @ts-ignore
            dispatch(addProduct({...data,image:reader.result}))
        }
    }
    useEffect(()=>{
        handleIsLoading(isLoading)
    },[isLoading])
    useEffect(()=>{
        setImage('')
        setPreview('')
        setData({name:'',price:'',stock:'',})
    },[products])
    useEffect(()=>{
        dispatch(getProduct())
    },[])
  return (
    <div className='w-full flex flex-col gap-4 md:gap-10 p-4'>
        {showAdd&&<div className={`w-full h-fit flex flex-wrap lg:flex-row lg:justify-evenly gap-4 justify-center relative py-5`}>
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
                <img src={preview?preview:'https://placehold.co/280x280?text=Image'} className='w-full h-52 object-contain' />
                {data.price&&<h2 className='capitalize font-bold'>{numberFormatMoney(+data.price)}</h2>}
                {data.name&&<h2 className='capitalize font-semibold line-clamp-1'>{data.name}</h2>}
                {data.stock&&<span className='capitalize text-sm mt-2'>stock : {data.stock}</span>}
            </div>
        </div>}
        <div className='flex flex-col items-start justify-start gap-4'>
            <h3 className='font-bold text-3xl'>All Products</h3>
            <div className='flex flex-wrap sm:flex-row justify-start items-center gap-2'>
                <Button onClick={()=>setShowAdd(true)} disabled={showAdd} classname='group flex items-center hover:bg-green-500 hover:border-green-500'>
                    <PlusIcon className='group-hover:text-white w-5 h-5 stroke-2' />
                    Add Product
                </Button>
                <div className='flex items-center gap-2 border border-gray-500 rounded-md px-4'>
                    <InputComponent onChange={e=>{}} type='text' placeholder='search' classname='border-none rounded-none p-0 w-full' />
                    <MagnifyingGlassIcon className='w-5 h-5 text-gray-500'/>
                </div>
            </div>
            <div className={`w-full h-full flex flex-wrap gap-4 justify-center ${!products.length&&' items-center'}`}>
                {
                    products.length?products.map(val=> <Product key={val.id} id={val.id} name={val.name} price={val.price} stock={val.stock} image={val.image} />):<EmptyComponent/>
                }
            </div>
        </div>
    </div>
  )
}

export default ProductsContainer