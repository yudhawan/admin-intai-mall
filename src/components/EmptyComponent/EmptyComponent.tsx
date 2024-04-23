import React, { ReactNode } from 'react'
import style from './EmptyComponent.module.scss'
function EmptyComponent({children}:{children?:ReactNode}) {
  return (
    <div className={`${style.main} font-extrabold text-gray-400 text-4xl`}>{children?children:'No Data'}</div>
  )
}

export default EmptyComponent