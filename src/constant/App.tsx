import { checkingTokenLoginValidation } from '@/app/api/libsServer/serverServices'
import React, { ReactNode } from 'react'

async function App({children}:{children:ReactNode}) {
  return (
    <>{children}</>
  )
}

export default App