import React, { ChangeEvent, useEffect, useState } from 'react'
import InputComponent from '../InputComponent/InputComponent'
import style from './AddDiscountModal.module.scss'
import { useRedux } from '@/redux/useRedux'
import { setDiscountState } from '@/redux/reducers/productsReducer'
import Button from '../Button/Button'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { DiscountInputType } from '@/type'
import { addDiscountAPI } from '@/app/api/libsServer/serverServices'
import { useRouter } from 'next/navigation'
function AddDiscountModal() {
    const validate = useQueryClient()
    const navigate = useRouter()
    const {selector,dispatch}=useRedux("products")
    const {addDiscountState} = selector
    const addDiscountMutation = useMutation({
        mutationFn:async(data:DiscountInputType)=> addDiscountAPI(data),
        onSuccess:()=>{
            validate.invalidateQueries({queryKey:['getDiscounts']})
            navigate.push('all-discounts')
        }
    })
    const handleInput=(e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=> {
        const file = e.target as HTMLInputElement
        if(e.target.id==='img') console.log(file.files)
        dispatch(setDiscountState({key:e.target.id,value:e.target.value}))
    }
    function handleSubmit(e:React.MouseEvent) {
        e.preventDefault()
        addDiscountMutation.mutate(addDiscountState)
    }
  return (
    <div className={style.main} onClick={e=>e.stopPropagation()}>
        <p className='text-xl font-bold'>Add Discount</p>
        <form action="" className='flex flex-col gap-2'>
            <InputComponent type='text' classname='w-full' placeholder='Discount Name' id='discount_name' value={addDiscountState.discount_name} onChange={handleInput} />
            <div className='flex gap-2 items-center w-full'>
                <select name="valueType" id="valType" onChange={handleInput} defaultValue={addDiscountState.valType}>
                    <option value="%">%</option>
                    <option value="$">$</option>
                </select>
                <InputComponent type='number' classname='w-full' placeholder='Value' id='value' value={addDiscountState.value} onChange={handleInput} />
            </div>
            <InputComponent type='file' classname='w-full' accept='image/*' id='img' placeholder='Discount Name' />
            <Button classname=' text-black hover:bg-green-500 cursor-pointer' onClick={handleSubmit}>Submit</Button>
        </form>
    </div>
  )
}

export default AddDiscountModal