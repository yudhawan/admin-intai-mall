'use client'
import Sidebar from '@/components/Sidebar/Sidebar'
import { store } from '@/redux/store'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import ModalProvider from './ModalProvider'
import ModalWindow from '@/ModalComponents/ModalWindow'

function MainApp({children}:{children:ReactNode}) {
  return (
   <div className='w-full h-screen'>
        <Provider store={store}>
            <Sidebar/>
            <div className='lg:ml-64 relative h-full w-[calc(100% - 256px)]'>
              <ModalProvider>
                {children}
                <ModalWindow/>
              </ModalProvider>
            </div>
        </Provider>
   </div>
  )
}

export default MainApp