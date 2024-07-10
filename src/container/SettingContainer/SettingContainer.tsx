"use client"
import Button from '@/components/Button/Button'
import style from './SettingContainer.module.scss'
import { handleLogout } from '@/app/api/libsServer/serverServices'
function SettingContainer() {
  return (
    <div className={style.main+' p-4'}>
        <Button onClick={()=>handleLogout()} classname='hover:!bg-red-400 !bg-red-500 !border-red-500 !text-white'>Logout</Button>
    </div>
  )
}

export default SettingContainer