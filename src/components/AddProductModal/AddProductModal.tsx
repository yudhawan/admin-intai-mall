import Image from 'next/image'
import { handleValidationForm, numberFormatMoney } from '@/services/services'
import { useEffect, useState } from 'react'
import { useRedux } from '@/redux/useRedux'
import { setAddProductState } from '@/redux/reducers/productsReducer'
import {  ProductDataInput } from '@/type'
import Button from '../Button/Button'
import InputComponent from '../InputComponent/InputComponent'
import style from './AddProductModal.module.scss'
import { addProduct } from '@/redux/actions/productsAction'
function AddProductModal() {
    const {dispatch,selector}= useRedux("products")
    const {addProductState} = selector
    const [image,setImage]=useState<any>()
    const [preview,setPreview]=useState<string | undefined>('')
    const [validation,setValidation] = useState<string[]>([])

    function handleInput(value:string|FileList,key:string) {
        if(value) setValidation(validation.filter(val=>val!==key))
        if(!value) setValidation(prev=>([...prev,value]))
        dispatch(setAddProductState({...addProductState,[key]:value}))
    }
    function handleSubmit(e:React.MouseEvent) {
        e.preventDefault()
        if(handleValidationForm(addProductState,setValidation).length) return;
        let reader = new FileReader()
        reader.readAsDataURL(image[0])
        reader.onload=async function () {
            dispatch(addProduct({products:addProductState,image:reader.result??''}))
        }
        setImage('')
        setPreview('')
    }
    
  return (
    <div className={style.main+' w-fit h-fit flex flex-wrap lg:flex-row lg:justify-evenly gap-8 justify-center relative py-5 rounded-lg p-4 bg-white drop-shadow-2xl'} onClick={e=>e.stopPropagation()}>
        <form className='gap-3 flex flex-col'>
            <h2 className='text-xl font-bold'>Add Product</h2>
            {
                Object.keys(addProductState).filter(val=>val!=='image').map(val=> <InputComponent key={val} type={val==='stock'?'number':'text'} onChange={e=> handleInput(e.target.value,val)} value={addProductState[val as keyof ProductDataInput]} placeholder={val} classname={`${validation.includes(val)&&'!border-red-500'}`} />)
            }
            <InputComponent type={'file'} accept='image/*' onChange={e=> {
                const file = e.target.files
                if(file?.length){
                    setPreview(URL.createObjectURL(file[0]))
                    setImage(file)
                }
            }}  />
            <select>

            </select>
            <Button onClick={handleSubmit}>submit</Button>
        </form>
        <div className='w-72 h-auto p-2 flex flex-col border border-gray-400 rounded-lg'>
            <Image src={preview?preview:'https://placehold.co/280x280?text=Image'} className='w-full h-52 object-contain' alt='img' width={280} height={280} />
            {addProductState.price&&<h2 className='capitalize font-bold'>{numberFormatMoney({val:+addProductState.price})}</h2>}
            {addProductState.name&&<h2 className='capitalize font-semibold line-clamp-1'>{addProductState.name}</h2>}
            {addProductState.stock&&<span className='capitalize text-sm mt-2'>stock : {addProductState.stock}</span>}
        </div>
    </div>
  )
}

export default AddProductModal