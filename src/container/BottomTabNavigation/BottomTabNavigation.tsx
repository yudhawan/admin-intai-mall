import React from 'react'
import { BoxMenuUrl } from '@/services/urlServices'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '@/components/Button/Button'
import { CogIcon,HomeIcon } from '@heroicons/react/24/outline'
import style from './BottomTabNavigation.module.scss'
function BottomTabNavigation() {
    const pathname = usePathname()
  return (
    <div className={`${style.main} flex justify-evenly fixed bottom-0 left-0 h-16 py-2 drop-shadow-lg bg-white md:hidden`}>
        <Link href={'/'} className={`${style.link} ${pathname==='/'?style.active:''} border-none !p-0 hover:!bg-transparent justify-between`}>
            <HomeIcon className='w-5'/>
            <span className='font-bold text-[10px]'>Home</span>
        </Link>
        {
            BoxMenuUrl.map(val=><Link key={val.name} href={val.link} className={`${style.link} ${pathname===val.link?style.active:''}`}>
                <val.icon className='w-5' />
                <span className='font-bold text-[10px]'>{val.name}</span>
            </Link>)
        }
        <Link href={'setting'} className={`${style.link} ${pathname==='setting'?style.active:''} border-none !p-0 hover:!bg-transparent`}>
            <CogIcon className='w-fit'/>
            <span className='font-bold text-[10px]'>setting</span>
        </Link>
    </div>
  )
}

export default BottomTabNavigation