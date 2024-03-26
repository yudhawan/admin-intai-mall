'use client'
import React, { useState } from 'react'
import InputComponent from '../components/InputComponent'
import { handleValidationForm, numberFormatMoney } from '../lib/services'
import Button from '../components/Button'
type dataInput={
    name:string,
    price:string,
    stock:string,
}
function ProductsContainer() {
    const [data,setData]=useState<dataInput>({
        name:'',
        price:'',
        stock:'',
    })
    const [image,setImage]=useState<FileList>()
    const [preview,setPreview]=useState<string | undefined>('')
    const [validation,setValidation] = useState<string[]>([])
    function handleInput(value:string|FileList,key:string) {
        if(value) setValidation(validation.filter(val=>val!==key))
        if(!value) setValidation(prev=>([...prev,value]))
        setData((prev)=>({...prev,[key]:value}))
    }
    function handleSubmit(e:React.MouseEvent) {
        e.preventDefault()
        if(handleValidationForm(data).length) return setValidation(handleValidationForm(data))
        console.log({...data,image})
    }
  return (
    <div className='w-full flex flex-col gap-4 p-4'>
        <div className='w-full flex flex-wrap lg:flex-row lg:justify-evenly gap-4 justify-center'>
            <form className='gap-3 flex flex-col'>
                <h2 className='text-xl font-bold'>Add Product</h2>
                {
                    Object.keys(data).filter(val=>val!=='image').map(val=> <InputComponent key={val} type={val==='stock'?'number':'text'} onChange={e=> handleInput(e.target.value,val)} value={data[val as keyof dataInput]} placeholder={val} classname={`${validation.includes(val)&&'!border-red-500'}`} />)
                }
                <InputComponent type={'file'} accept='image/*' onChange={e=> {
                    const file = e.target.files
                    if(file?.length){
                        setPreview(URL.createObjectURL(file[0]))
                        setImage(file)
                    }
                }}  />
                <Button onClick={handleSubmit}>submit</Button>
            </form>
            <div className='w-72 h-auto p-2 flex flex-col border border-gray-400 rounded-lg'>
                {preview&&<img src={preview} className='w-full h-52 object-contain' />}
                {data.price&&<h2 className='capitalize font-bold'>{numberFormatMoney(+data.price)}</h2>}
                {data.name&&<h2 className='capitalize font-semibold line-clamp-1'>{data.name}</h2>}
                {data.stock&&<span className='capitalize text-sm mt-2'>stock : {data.stock}</span>}
            </div>
        </div>
    </div>
  )
}

export default ProductsContainer