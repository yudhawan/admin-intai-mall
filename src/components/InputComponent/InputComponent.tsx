import React from 'react'


type inputProp={
    classname?:string
    type?: React.HTMLInputTypeAttribute | undefined
    value?:string | number | readonly string[] | undefined
    onChange:React.ChangeEventHandler<HTMLInputElement> | undefined
    accept?:string
    disabled?:boolean
    placeholder?:string
    ref?:React.LegacyRef<HTMLInputElement>
    id?:string
    hidden?:boolean
}
function InputComponent({classname,type='text',accept,disabled,onChange,value,placeholder,ref,id,hidden}:inputProp) {
  return (
    <div className={`${classname} p-2 border border-gray-300 w-56 rounded-md`}>
        <input ref={ref} className='focus:outline-none w-full h-full border-none placeholder:capitalize bg-transparent' type={type} value={value} onChange={onChange} accept={accept} disabled={disabled} placeholder={placeholder} id={id} hidden={hidden} />
    </div>
  )
}

export default InputComponent