import React, { ReactNode } from 'react'
import ClientApp from './ClientApp'
import { checkingTokenLoginValidation } from '@/app/api/libsServer/serverServices'
import LoginContainer from '@/container/LoginContainer/LoginContainer'

async function MainApp({children}:{children:ReactNode}) {
  const response = await checkingTokenLoginValidation()
  const user = JSON.stringify(response)
  if(!user) return <LoginContainer/>
  return (
   <ClientApp user={user}>
      {children}
   </ClientApp>
  )
}

export default MainApp