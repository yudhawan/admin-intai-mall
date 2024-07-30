import Image from 'next/image'
import {XMarkIcon} from '@heroicons/react/24/outline'
import { CategoryProp } from '@/type'
import style from './Category.module.scss'
import Button from '../Button/Button'
function Category({id,name,products,icon,handleDelete}:CategoryProp&{handleDelete?:(id:string)=>void}) {
  return (
    <div className={style.main+' bg-green-500'}>
      {icon&&<Image alt={name} src={icon} width={25} height={25} className='rounded-full' />}
      <span className='text-white capitalize'>{name}</span>
      {handleDelete&&<Button classname='!p-0 !rounded-full group hover:!bg-red-500'>
        <XMarkIcon className='w-4 h-4 text-red-500 group-hover:text-white' />
      </Button>}
    </div>
  )
}

export default Category