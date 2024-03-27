import { ModalContext } from '@/constant/ModalContext'
import { ModalAppProp, ModalContextProp } from '@/type'
import React, { useContext } from 'react'
import ModalAppList from '.'

function ModalWindow() {
  const {active,modalId,isLoading,handleActive,handleModalId} = useContext(ModalContext) as ModalContextProp
  const modal = ModalAppList.find(val=>val.id===modalId) as ModalAppProp
  function handlePropagation(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(!isLoading) {
      e.stopPropagation()
      handleActive(false)
      handleModalId('')
    }
  }
  if(active&&modal.id) return (
    <div className='absolute inset-0 w-full h-screen flex justify-center items-center bg-transparent backdrop-blur-[2px]' onClick={handlePropagation}>
      {modal.component}
    </div>
  )
}

export default ModalWindow