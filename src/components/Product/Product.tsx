import Image from 'next/image'
import React from 'react'
import { ProductProp } from '@/type'
import Button from '../Button/Button'
import {TrashIcon} from '@heroicons/react/24/outline'
import style from './Product.module.scss'
import { numberFormatMoney } from '@/services/services'

function Product({id,name,price,stock,caregoryId,category,desc,image,deleteFn}:ProductProp) {
  return (
    <div className={`${style.main} w-56 h-auto p-2 flex flex-col border border-gray-300 rounded-lg relative`}>
        <Image src={image?image:'https://placehold.co/280x280?text=Image'} width={250} height={250} alt='image' className='w-full h-52 object-contain' />
        <h2 className='capitalize font-bold'>{numberFormatMoney({val:+price})}</h2>
        <h2 className='capitalize font-semibold line-clamp-1'>{name}</h2>
        <span className='capitalize text-sm mt-2'>stock : {stock}</span>
        {deleteFn&&<Button onClick={()=>deleteFn()} classname='border-red-400 group hover:border-red-500 hover:bg-transparent w-fit absolute right-1 bottom-1 p-1'><TrashIcon className='w-5 h-5 group-hover:text-red-500 text-red-400' /></Button>}
    </div>
  )
}TrashIcon

export default Product