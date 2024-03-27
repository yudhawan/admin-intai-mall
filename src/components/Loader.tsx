import Image from 'next/image'
import React from 'react'

function Loader() {
  return <Image src={'/loading.gif'} width={150} height={150} alt='loading' className='select-none' />
}

export default Loader