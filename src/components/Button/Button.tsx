import React, { ReactNode } from 'react'
import style from './Button.module.scss'

type buttonProp={
    classname?:string
    children:ReactNode
    onClick:React.MouseEventHandler<HTMLButtonElement>
    disabled?:boolean
}
function Button({onClick,children,classname,disabled}:buttonProp) {
  return <button className={`${style.main} ${classname} bg-white border border-gray-400 rounded-md hover:bg-gray-500 hover:text-white capitalize hover:border-gray-500 p-2 font-semibold`} onClick={onClick} disabled={disabled}>
    {children}
  </button>
}

export default Button