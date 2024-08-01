import React, { ChangeEvent, useContext, useRef, useState } from 'react'
import style from './AddCategoryModal.module.scss'
import Image from 'next/image'
import InputComponent from '../InputComponent/InputComponent'
import Button from '../Button/Button'
import { handleValidationForm } from '@/services/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCategory } from '@/app/api/libsServer/serverServices'
import { useParams, useRouter } from 'next/navigation'
function AddCategoryModal() {
    const queryClient = useQueryClient()
    const {id}=useParams()
    const navigate = useRouter()
    const imgRef=useRef<HTMLInputElement>(null)
    const [icon,setIcon] = useState<any>(null)
    const [category,setCategory] = useState<string>('')
    const [preview,setPreview] = useState<string>('')
    const [validation,setValidation] = useState<string[]>([])
    const mutate = useMutation({
      mutationFn:async(data:{icon:ArrayBuffer|string,name:string})=>addCategory(data),
      onSuccess:()=>{
          queryClient.invalidateQueries({queryKey:['getCategories']})
          id!=="all-categories"?navigate.push('all-categories'):null
      }
  })
    const handleSubmit = (e:React.MouseEvent)=>{
      e.preventDefault()
      if(!category) return handleValidationForm({category},setValidation)
      let reader = new FileReader()
      reader.readAsDataURL(icon[0])
      reader.onload=async function () {
        mutate.mutate({icon:reader.result || "",name:category})
      }
    }
    const onChange = (e:ChangeEvent<HTMLInputElement>,id:string)=>{
      if(e.target.value){
        setValidation(validation.filter(val=>val!==id))
        setCategory(e.target.value)
      }else setValidation(prev=>([...prev,id]))
    }
  return (
    <form className={style.main+' w-fit h-fit flex flex-col lg:flex-row lg:justify-evenly gap-8 justify-center relative py-5 rounded-lg p-4 bg-white drop-shadow-2xl items-center'} onClick={e=> e.stopPropagation()} action={()=>handleSubmit}>
        <span className='font-bold text-xl'>Add Category</span>
        <span onClick={()=>imgRef.current?.click()}><Image src={preview?preview:'https://placehold.co/50x50?text=Icon'} width={50} height={50} alt='preview'/></span>
        <InputComponent onChange={e=>onChange(e,'category')} value={category} placeholder='Category' className={`${validation.includes('category')&&'!border-red-500'}`} />
        <InputComponent ref={imgRef} type={'file'} accept='image/*' onChange={e=> {
            const file = e.target.files
            if(file?.length){
                setPreview(URL.createObjectURL(file[0]))
                setIcon(file)
            }
        }} classname='hidden' />
        <Button onClick={handleSubmit}>submit</Button>
    </form>
  )
}

export default AddCategoryModal