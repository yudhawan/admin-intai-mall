import { numberFormatMoney } from '@/lib/services'
import { ProductProp } from '@/type'
import Image from 'next/image'
import React from 'react'

function Product({id,name,price,stock,caregoryId,category,desc,image}:ProductProp) {
  return (
    <div className='w-72 h-auto p-2 flex flex-col border border-gray-300 rounded-lg'>
        <Image src={image?image:'https://placehold.co/280x280?text=Image'} width={250} height={250} alt='image' className='w-full h-52 object-contain' />
        <h2 className='capitalize font-bold'>{numberFormatMoney(+price)}</h2>
        <h2 className='capitalize font-semibold line-clamp-1'>{name}</h2>
        <span className='capitalize text-sm mt-2'>stock : {stock}</span>
    </div>
  )
}

export default Product