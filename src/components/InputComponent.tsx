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
}
function InputComponent({classname,type='text',accept,disabled,onChange,value,placeholder,ref}:inputProp) {
  return (
    <div className={`${classname} p-2 border border-gray-300 w-56 rounded-md`}>
        <input ref={ref} className='focus:outline-none w-full h-full border-none placeholder:capitalize' type={type} value={value} onChange={onChange} accept={accept} disabled={disabled} placeholder={placeholder} />
    </div>
  )
}

export default InputComponent