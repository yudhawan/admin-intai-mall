import { useState } from 'react'
import Button from '../Button/Button'
import style from './DropdownComponent.module.scss'
import InputComponent from '../InputComponent/InputComponent'
interface ObjectType{
    id:string | number
    value:string | number
}
interface DropdownType{
    buttonText?:string
    data:ObjectType[]
    withSearch?:boolean
    dataType:ObjectType
    onSelected:(val:ObjectType)=>void
}
function DropdownComponent({data,buttonText="Pilih",withSearch,dataType,onSelected}:DropdownType) {
    const [getShow,setShow]=useState(false)
    const [getSearch,setSearch]=useState('')
    const handleSelected = (val:ObjectType)=> onSelected(val)
  return (
    <div className={style.main}>
        <Button onClick={()=>setShow(!getShow)}>
            {buttonText}
        </Button>
        {withSearch&&<InputComponent type='text' value={getSearch} onChange={e=>setSearch(e.target.value)} />}
        <div className={style.list}>    
            {data.filter(val=> val.value===getSearch).map(val=>{
                return(
                    <span className='cursor-pointer hover:bg-red-200 text-sm' onClick={()=>handleSelected(val)}>{val.value}</span>
                )
            })}
        </div>
    </div>
  )
}

export default DropdownComponent