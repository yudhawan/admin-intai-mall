'use client'
import React, { useState } from 'react'
import style from './LoginContainer.module.scss'
function LoginContainer() {
    const [data,setData]=useState({
        username:'',
        password:''
    })
  return (
    <div className={style.main}>
        <form action="">
            {Object.entries(data).map(val=>{
                return <input type={val[0]==='password'?val[0]:'text'} value={val[0]} placeholder={val[0]} className={style.inputContainer} />
            })}
        </form>
    </div>
  )
}

export default LoginContainer