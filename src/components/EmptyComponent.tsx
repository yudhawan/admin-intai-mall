import React, { ReactNode } from 'react'

function EmptyComponent({children}:{children?:ReactNode}) {
  return (
    <div className='font-extrabold text-gray-400 text-4xl'>{children?children:'No Data'}</div>
  )
}

export default EmptyComponent