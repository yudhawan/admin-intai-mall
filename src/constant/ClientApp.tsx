'use client'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import Sidebar from '@/components/Sidebar/Sidebar'
import { store } from '@/redux/store'
import ModalProvider from './ModalProvider'
import ModalWindow from '@/ModalComponents/ModalWindow'
import BottomTabNavigation from '@/container/BottomTabNavigation/BottomTabNavigation'
import PrivateComponent from '@/PrivateComponent/PrivateComponent'
import style from './ClientApp.module.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUserState } from '@/storage/userState'
const querClient = new QueryClient()
function ClientApp({children,user}:{children:ReactNode,user:string}) {
  const {data,setUser} = useUserState()
  const pathname=usePathname()
  const isLoginPage = pathname==='/login'
  const user_stat = JSON.parse(user)
  return (
    <div className={style.main+' bg-gray-100'}>
        {/* <Provider store={store}> */}
          <QueryClientProvider client={querClient}>
            <PrivateComponent>
              <Sidebar/>
            </PrivateComponent>
            <div className={style.container+` ${!isLoginPage?' md:ml-64':''} relative w-[calc(100% - 256px)] md:h-full`}>
              <ModalProvider user={user_stat}>
                  {children}
                <ModalWindow/>
              </ModalProvider>
            </div>
            <PrivateComponent>
              <BottomTabNavigation/>
            </PrivateComponent>
          </QueryClientProvider>
        {/* </Provider> */}
   </div>
  )
}

export default ClientApp