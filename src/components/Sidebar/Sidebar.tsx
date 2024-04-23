import { usePathname } from 'next/navigation'
import { urlMenu } from '../../lib/urlServices'
import Link from 'next/link'
import Button from '../Button/Button'
import {ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/outline'

function Sidebar() {
  const pathname = usePathname()
  const path = '/'+pathname.split('/')[1]
  return (
    <div className='h-full fixed left-0 top-0 w-64 p-2 gap-10 hidden lg:flex flex-col bg-gray-100 border-r border-red-100'>
      <h3 className='uppercase font-extrabold text-2xl flex flex-col'><span>intai-mall</span> <span className='text-red-500'>admin</span></h3>
      <div className='w-full h-full flex flex-col '>
        {urlMenu.map(val=><Link href={val.url} key={val.url} className={`font-semibold rounded-sm p-2 hover:bg-red-400 hover:text-white capitalize ${pathname===val.url&&'bg-red-400 text-white'}`}>{val.name}</Link>)}
      </div>
      <Button onClick={()=>{}} classname='border-none bg-transparent hover:bg-red-400 text-left justify-between flex items-center text-red-500 group'>
        Logout
        <ArrowRightStartOnRectangleIcon className='w-6 h-6 text-red-500 stroke-2 group-hover:text-white'/>
      </Button>
    </div>
  )
}

export default Sidebar