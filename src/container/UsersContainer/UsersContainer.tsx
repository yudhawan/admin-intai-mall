'use client'
import style from './UsersContainer.module.scss'
import { MouseEvent, useEffect, useState } from 'react'
import InputComponent from '@/components/InputComponent/InputComponent'
import PaginationContainer from '../PaginationContainer/PaginationContainer'
import { getUserFake} from '@/faker'
import { useRedux } from '@/redux/useRedux'
import { setUsers } from '@/redux/reducers/usersReducers'
function UsersContainer() {
  const {dispatch,selector} = useRedux("users")
  
  const [getChecked,setChecked]=useState<string[]>([])
  const [search,setSearch] = useState<string>('')
  function handleCheckAll(e:MouseEvent<HTMLInputElement>) {
    const id = e.currentTarget.checked
    if(id){
      const all = selector.user?.map(val=> val.id)
      setChecked(all)
      return
    }else setChecked([])
  }
  function handleCheck(e:MouseEvent<HTMLInputElement>) {
    const id = e.currentTarget.id
    if(getChecked?.includes(id)){
      const newData = getChecked?.filter(val=>val!==id)
      setChecked(newData)
    }
    else {
      setChecked(prev=>([...prev, id]))
    }
  }
  useEffect(()=>{
    if(!selector?.["user"]) dispatch(setUsers(getUserFake()))
  },[])
  return (
    <div className={style.main}>
      <div className='w-full flex gap-4'>
        <InputComponent type='text' placeholder='Search' />
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th><input type='checkbox' onClick={handleCheckAll} id='all' /></th>
            <th>name</th>
            <th>facebook</th>
            <th>address</th>
            <th>jenis</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {
            !!selector.user?.length&& selector.user.map(val=>{
              return(
                <tr key={val.id}>
                  <td align='center'>
                    <input type='checkbox' id={val?.id} onClick={handleCheck} checked={getChecked.includes(val?.id)} />
                  </td>
                  <td className='text-sm font-semibold'>{val.name}</td>
                  <td className='text-sm'>@{val.sosmed}</td>
                  <td className='text-sm'>{val.address}</td>
                  <td className='text-sm'>{val.jenis}</td>
                  <td className='text-sm'>{val.status}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <PaginationContainer amount={30} page={1} totalData={123} />
    </div>
  )
}

export default UsersContainer