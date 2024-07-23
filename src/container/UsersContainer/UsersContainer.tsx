'use client'
import Button from '@/components/Button/Button'
import style from './UsersContainer.module.scss'
import { ChangeEvent, useState } from 'react'
import InputComponent from '@/components/InputComponent/InputComponent'
import PaginationContainer from '../PaginationContainer/PaginationContainer'
function UsersContainer() {
  const [getChecked,setChecked]=useState<string[]>([])
  function handleCheck(e:ChangeEvent<HTMLInputElement>) {
    const checked = e.target 
    // if(checked) {
    //   // @ts-ignore
    //   e.target?.checked=false
    //   const newData = getChecked?.filter(val=>val!==e.target?.id)
    //   setChecked(newData)
    // }
    // else {
    //   // @ts-ignore
    //   e.target?.checked=true
    //   setChecked(prev=>([...prev, e.target?.id]))

    // }
  }
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
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align='center'>
              <input type='checkbox' onChange={handleCheck} id={""} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <PaginationContainer/>
    </div>
  )
}

export default UsersContainer