import { useRef, useState } from 'react'
import style from './AddCategoryModal.module.scss'
import Image from 'next/image'
import InputComponent from '../InputComponent/InputComponent'
import Button from '../Button/Button'
function AddCategoryModal() {
    const imgRef=useRef()
    const [icon,setIcon] = useState<FileList>()
    const [category,setCategory] = useState<string>('')
    const [preview,setPreview] = useState<string>('')
  return (
    <form className={style.main+' w-fit h-fit flex flex-col lg:flex-row lg:justify-evenly gap-8 justify-center relative py-5 rounded-lg p-4 bg-white drop-shadow-2xl items-center'} onClick={e=> e.stopPropagation()}>
        <span className='font-bold text-xl'>Add Category</span>
        {/* @ts-ignore */}
        <span onClick={()=>imgRef.current?.click()}><Image src={preview?preview:'https://placehold.co/50x50?text=Icon'} width={50} height={50} alt='preview'/></span>
        <InputComponent onChange={()=>{}} value={category} placeholder='Category' />
        <InputComponent type={'file'} accept='image/*' onChange={e=> {
            const file = e.target.files
            if(file?.length){
                setPreview(URL.createObjectURL(file[0]))
                setIcon(file)
            }
        }} hidden />
        <Button onClick={()=>{}}>submit</Button>
    </form>
  )
}

export default AddCategoryModal