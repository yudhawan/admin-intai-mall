'use client'
import Sidebar from '@/components/Sidebar'
import { store } from '@/redux/store'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

function MainApp({children}:{children:ReactNode}) {
  return (
   <div className='w-full h-screen'>
        <Provider store={store}>
            <Sidebar/>
            <div className='lg:ml-64'>
                {children}
            </div>
        </Provider>
   </div>
  )
}

export default MainApp