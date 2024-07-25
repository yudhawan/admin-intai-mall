'use client'
import Button from '@/components/Button/Button'
import style from './UsersContainer.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import InputComponent from '@/components/InputComponent/InputComponent'
import PaginationContainer from '../PaginationContainer/PaginationContainer'
import { getUserFake, UserFakeType } from '@/faker'
import { useRedux } from '@/redux/useRedux'
import { setUsers } from '@/redux/reducers/usersReducers'
function UsersContainer() {
  const {dispatch,selector} = useRedux("")
  
  const [getChecked,setChecked]=useState<string[]>([])
  const [search,setSearch] = useState<string>('')

  function handleCheck(e:ChangeEvent<HTMLInputElement>) {
    if(e.target instanceof HTMLInputElement) {
      if(e.target.checked){
        e.target.checked=false
        const newData = getChecked?.filter(val=>val!==e.target?.id)
        setChecked(newData)

      }
      else {
        e.target.checked=true
        setChecked(prev=>([...prev, e.target?.id]))
  
      }
    }
  }
  useEffect(()=>{
    if(!selector?.["users"]) dispatch(setUsers(getUserFake()))
  },[])
  return (
    <div className={style.main}>
      <div className='w-full flex gap-4'>
        <InputComponent type='text' placeholder='Search' />
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th><input type='checkbox' onChange={e=>e.target.checked} /></th>
            <th>name</th>
            <th>facebook</th>
            <th>address</th>
            <th>jenis</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {
            !!getUserFake()?.length&& getUserFake().map(val=>{
              return(
                <tr key={val.id}>
                  <td align='center'>
                    <input type='checkbox' onChange={handleCheck} id={val?.id} onClick={e=>{}} />
                  </td>
                  <td>{val.name}</td>
                  <td>@{val.sosmed}</td>
                  <td>{val.address}</td>
                  <td>{val.jenis}</td>
                  <td>{val.status}</td>
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