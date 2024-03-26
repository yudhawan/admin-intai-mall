import Image from 'next/image'
import React from 'react'

function Loader() {
  return <Image src={'/loading.gif'} width={211} height={211} alt='loading' />
}

export default Loader