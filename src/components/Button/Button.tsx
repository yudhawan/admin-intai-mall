import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import style from './Button.module.scss'

type buttonProp=ButtonHTMLAttributes<HTMLButtonElement> & {
    classname?:string
    children:ReactNode
}
function Button({children,classname,...props}:buttonProp) {
  return <button className={`${style.main} ${classname} bg-white border border-gray-400 rounded-md hover:bg-gray-500 hover:text-white capitalize hover:border-gray-500 p-2 font-semibold`} onClick={props?.onClick} disabled={props?.disabled}>
    {children}
  </button>
}

export default Button