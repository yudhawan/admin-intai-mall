import React from 'react'
import style from './BoxMenuLink.module.scss'
import { BoxMenuLinkProp } from '@/type'
import Link from 'next/link'
function BoxMenuLink({badges,icon,name,link}:BoxMenuLinkProp) {
  return (
    <Link className={`${style.main} flex-col items-center border group border-gray-500 hover:border-red-500 p-4 rounded-lg w-full xs:w-fit lg:hidden hover:scale-105 transition-all ease-in-out relative`} href={link??''}>
        {badges!=0?<span className='absolute top-1 right-1 bg-red-500 rounded-full p-1 px-[6px] text-white text-xs'>{badges}</span>:''}
        {icon}
        <span className='text-gray-500 group-hover:text-red-500  font-bold capitalize' >{name}</span>
    </Link>
  )
}

export default BoxMenuLink