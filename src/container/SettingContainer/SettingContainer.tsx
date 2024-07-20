"use client"
import Button from '@/components/Button/Button'
import style from './SettingContainer.module.scss'
import { handleLogoutApi } from '@/app/api/libsServer/serverServices'
import { useContext } from 'react'
import { ModalContext } from '@/constant/ModalContext'
import { ModalContextProp } from '@/type'
function SettingContainer() {
  const {token,handleLogout} = useContext(ModalContext) as ModalContextProp
  function logoutHandle() {
    handleLogout('imt')
    handleLogoutApi(token || "")
  }
  return (
    <div className={style.main+' p-4'}>
      <div className='w-full h-full flex flex-col gap-4'>
      </div>
      <Button onClick={logoutHandle} classname='hover:!bg-red-400 !bg-red-500 !border-red-500 !text-white'>Logout</Button>
    </div>
  )
}

export default SettingContainer