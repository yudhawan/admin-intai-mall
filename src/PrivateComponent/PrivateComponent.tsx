import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

function PrivateComponent({children}:{children:ReactNode}) {
  const pathname=usePathname()
  if(pathname==='/login') return <></>
  return children
}

export default PrivateComponent