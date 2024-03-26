import React, { ReactNode } from 'react'

type buttonProp={
    classname?:string
    children:ReactNode
    onClick:React.MouseEventHandler<HTMLButtonElement>
}
function Button({onClick,children,classname}:buttonProp) {
  return <button className={`${classname} bg-white border border-gray-400 rounded-md hover:bg-gray-500 hover:text-white capitalize hover:border-gray-500 p-2 font-semibold`} onClick={onClick}>
    {children}
  </button>
}

export default Button