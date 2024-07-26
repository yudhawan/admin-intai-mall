import { ChangeEvent, useEffect, useState } from 'react'
import InputComponent from '../InputComponent/InputComponent'
import style from './AddDiscountModal.module.scss'
import { useRedux } from '@/redux/useRedux'
import { setDiscount } from '@/redux/reducers/productsReducer'
import { AppDispatch } from '@/redux/store'
import { ProductProp, ProductsStateType } from '@/type'
function AddDiscountModal() {
    const {selector,dispatch}=useRedux("products")
    const {addDiscountState} = selector
    const handleInput=(e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=> {
        const file = e.target as HTMLInputElement
        if(e.target.id==='img') console.log(file.files)
        dispatch(setDiscount({key:e.target.id,value:e.target.value}))
    }
    useEffect(()=>{
        console.log('dsa')
    },[])
  return (
    <div className={style.main} onClick={e=>e.stopPropagation()}>
        <p className='text-xl font-bold'>Add Discount</p>
        <form action="" className='flex flex-col gap-2'>
            <InputComponent type='text' classname='w-full' placeholder='Discount Name' id='discount_name' value={addDiscountState.discount_name} onChange={handleInput} />
            <div className='flex gap-2 items-center w-full'>
                <select name="valueType" id="" onChange={handleInput}>
                    <option value="percent">%</option>
                    <option value="currency">$</option>
                </select>
                <InputComponent type='number' classname='w-full' placeholder='Value' id='value' value={addDiscountState.value} onChange={handleInput} />
            </div>
            <InputComponent type='file' classname='w-full' accept='image/*' id='img' placeholder='Discount Name' />
            <InputComponent type='submit' value={'Submit'} classname='bg-green-400 text-white hover:bg-green-500 cursor-pointer'  />
        </form>
    </div>
  )
}

export default AddDiscountModal