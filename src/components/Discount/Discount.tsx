import { DiscountInputType } from '@/type'
import Image from 'next/image'
import style from './Discount.module.scss'
function Discount({discount_name,valType,value,picture}:DiscountInputType) {
  return (
    <div className={style.main+' bg-orange-200 rounded-md hover:bg-orange-500 py-2 px-4'}>
      {picture?<Image src={picture} alt={discount_name} width={50} height={50} />:''}
      <div className='flex gap-4 items-center'>
        <span className='text-xl font-bold'>{discount_name}</span>
        <span className={style.content+' text-xl font-bold'}>{valType}{value}</span>
      </div>
    </div>
  )
}

export default Discount