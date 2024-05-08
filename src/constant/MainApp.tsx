'use client'
import Sidebar from '@/components/Sidebar/Sidebar'
import { store } from '@/redux/store'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import ModalProvider from './ModalProvider'
import ModalWindow from '@/ModalComponents/ModalWindow'
import BottomTabNavigation from '@/container/BottomTabNavigation/BottomTabNavigation'

function MainApp({children}:{children:ReactNode}) {
  return (
   <div className='w-full h-screen'>
        <Provider store={store}>
            <Sidebar/>
            <div className='md:ml-64 relative h-[calc(100vh - 64px)] w-[calc(100% - 256px)] md:h-full'>
              <ModalProvider>
                {children}
                <ModalWindow/>
              </ModalProvider>
            </div>
            <BottomTabNavigation/>
        </Provider>
   </div>
  )
}

export default MainApp