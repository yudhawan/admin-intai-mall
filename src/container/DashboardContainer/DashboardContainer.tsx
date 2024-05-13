import React from 'react'
import BannerContainer from '../BannerContainer/BannerContainer'
import style from './DashboardContainer.module.scss'
import BoxMenuLink from '@/components/BoxMenuLink/BoxMenuLink'
import { BoxMenuUrl } from '@/services/urlServices'
function DashboardContainer() {
  return (
    <div className={`${style.main} p-8 flex-col gap-10`}>
      <div className={`${style.orderContainer} flex flex-col gap-2`}>
        {/* <span className='text-gray-600 font-bold text-xl'></span> */}
        <div className='flex flex-wrap gap-4 justify-center md:justify-start'>
          {
            BoxMenuUrl.map(val=><BoxMenuLink key={val.name} icon={<val.icon/>} name={val.name} link={val.link} badges={19} />)
          }
        </div>
        
      </div>
      <div className={`${style.bannerContainer} flex flex-col gap-2`}>
        <span className='text-gray-600 font-bold text-xl'>Banner Home</span>
        <BannerContainer/>
      </div>
    </div>
  )
}

export default DashboardContainer