'use client'
import Sidebar from '@/components/Sidebar/Sidebar'
import { store } from '@/redux/store'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import ModalProvider from './ModalProvider'
import ModalWindow from '@/ModalComponents/ModalWindow'
import BottomTabNavigation from '@/container/BottomTabNavigation/BottomTabNavigation'
import style from './MainApp.module.scss'
import PrivateComponent from '@/PrivateComponent/PrivateComponent'
function MainApp({children}:{children:ReactNode}) {
  return (
   <div className={style.main+' bg-gray-100'}>
        <Provider store={store}>
            <PrivateComponent>
              <Sidebar/>
            </PrivateComponent>
            <div className={style.container+' md:ml-64 relative w-[calc(100% - 256px)] md:h-full '}>
              <ModalProvider>
                {children}
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