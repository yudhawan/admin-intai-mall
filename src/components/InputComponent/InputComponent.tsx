import React, { forwardRef } from 'react'


type inputProp=React.InputHTMLAttributes<HTMLInputElement> & {
    classname?:string
}
  const  InputComponent=forwardRef<HTMLInputElement,inputProp>((props,ref)=> {
    const {classname, ...inputProps}= props
    return (
      <div className={`${classname} p-2 border border-gray-300 w-56 rounded-md`}>
          <input ref={ref} {...inputProps} className='focus:outline-none w-full h-full border-none placeholder:capitalize bg-transparent'  />
      </div>
    )
})

export default InputComponent