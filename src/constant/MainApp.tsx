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
import style from './MainApp.module.scss'
import App from './App'
function MainApp({children}:{children:ReactNode}) {
  const pathname=usePathname()
  const isLoginPage = pathname==='/login'
  return (
   <div className={style.main+' bg-gray-100'}>
        <Provider store={store}>
            <PrivateComponent>
              <Sidebar/>
            </PrivateComponent>
            <div className={style.container+` ${!isLoginPage?' md:ml-64':''} relative w-[calc(100% - 256px)] md:h-full`}>
              <ModalProvider>
                {/* <App> */}
                  {children}
                {/* </App> */}
                <ModalWindow/>
              </ModalProvider>
            </div>
            <PrivateComponent>
              <BottomTabNavigation/>
            </PrivateComponent>
        </Provider>
   </div>
  )
}

export default MainApp