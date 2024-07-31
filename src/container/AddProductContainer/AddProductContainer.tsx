'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {ChevronLeftIcon} from '@heroicons/react/24/outline'
import { handleValidationForm, numberFormatMoney } from '@/services/services'
import { useRedux } from '@/redux/useRedux'
import {  ProductDataInput } from '@/type'
import InputComponent from '@/components/InputComponent/InputComponent'
import Button from '@/components/Button/Button'
import { addProduct } from '@/app/api/libsServer/serverServices'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import style from './AddProductContainer.module.scss'

function AddProductContainer() {
    const queryClient = useQueryClient()
    const navigate = useRouter()
    const {dispatch,selector}= useRedux("products")
    const [getState,setState]=useState({name:'',price:'',stock:''})
    // const {addProductState} = selector
    const [image,setImage]=useState<any>()
    const [preview,setPreview]=useState<string | undefined>('')
    const [validation,setValidation] = useState<string[]>([])
    const mutate = useMutation({
        mutationFn:async(data:{products:ProductDataInput,image:string|ArrayBuffer})=>addProduct(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['getProducts']})
            navigate.back()
        }
    })
    function handleInput(value:string|FileList,key:string) {
        if(value) setValidation(validation.filter(val=>val!==key))
            if(!value) setValidation(prev=>([...prev,value]))
                setState({...getState,[key]:value})
    }
    function handleImageInput(params:FileList) {
        let reader = new FileReader()
        reader.readAsDataURL(params[0])
        reader.onload=async function () {
            setImage(reader.result)
        }
    }
    
    function handleSubmit(e:React.MouseEvent) {
        e.preventDefault()
        if(handleValidationForm(getState,setValidation).length) return;
        mutate.mutate({products:getState,image})
        setImage('')
        setPreview('')
    }
    
  return (
    <div className='flex flex-col gap-10 bg-white py-5 px-4'>
        <Button onClick={()=> navigate.back()} classname='!w-fit border-none px-0 flex items-center gap-2 hover:bg-white hover:text-black'>
            <ChevronLeftIcon className='text-black w-5 h-5' />
            Back
        </Button>
        <h2 className='text-xl font-bold'>Add Product</h2>
        <div className={style.main} onClick={e=>e.stopPropagation()}>
            <form className='gap-3 flex flex-col'>
                {
                    Object.keys(getState).filter(val=>val!=='image').map(val=> <InputComponent key={val} type={val==='stock'?'number':'text'} onChange={e=> handleInput(e.target.value,val)} value={getState[val as keyof ProductDataInput]} placeholder={val} classname={`${validation.includes(val)&&'!border-red-500'}`} />)
                }
                <InputComponent type={'file'} accept='image/*' onChange={e=> {
                    const file = e.target.files
                    if(file?.length){
                        setPreview(URL.createObjectURL(file[0]))
                        handleImageInput(file)
                    }
                }}  />
                {/* <TextEditor/> */}
                <Button disabled={mutate.isPending} onClick={handleSubmit}>submit</Button>
            </form>
            <div className={style.previewContainer+' w-72 h-fit p-2 flex flex-col border border-gray-400 rounded-lg'}>
                <Image src={preview?preview:'https://placehold.co/280x280?text=Image'} className='w-full h-52 object-contain' alt='img' width={280} height={280} />
                {getState.price&&<h2 className='capitalize font-bold'>{numberFormatMoney({val:+getState.price})}</h2>}
                {getState.name&&<h2 className='capitalize font-semibold line-clamp-1'>{getState.name}</h2>}
                {getState.stock&&<span className='capitalize text-sm mt-2'>stock : {getState.stock}</span>}
            </div>
        </div>
    </div>
  )
}

export default AddProductContainer