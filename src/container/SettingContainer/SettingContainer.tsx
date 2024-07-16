"use client"
import Button from '@/components/Button/Button'
import style from './SettingContainer.module.scss'
import { handleLogout } from '@/app/api/libsServer/serverServices'
import { useUserState } from '@/storage/userState'
function SettingContainer() {
  const {logoutUser,data} = useUserState()
  function logoutHandle() {
    handleLogout(data?.token || "")
    logoutUser()
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