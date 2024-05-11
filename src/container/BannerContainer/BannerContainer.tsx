'use client'
import React, { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import Button from '@/components/Button/Button'
import {ChevronLeftIcon,ChevronRightIcon, PhotoIcon} from '@heroicons/react/24/outline'
import style from './BannerContainer.module.scss'
import { useRedux } from '@/redux/useRedux'
import { addBanners } from '@/redux/reducers/bannersReducer'
function BannerContainer() {
    const {dispatch}=useRedux()
    const [isLoadingSync, startTransition] = useTransition()
    const [images,setImages] = useState()
    const [preview,setPreview] = useState<string[]>([])
    const [index,setIndex] = useState<number>(0)
    const imgref = useRef<any>()
    function handleImage() {
        let prev = []
        const files = Array.from(imgref?.current?.files)
        if(!files) return
        Promise.all(
            files?.map((val:any)=>{
                return new Promise((resolve,reject)=>{
                    let reader = new FileReader()
                    reader.onload=(e)=>{
                        resolve({src:e.target?.result,alt:val.name})
                    }
                    reader.onerror=(e)=>{
                        reject(e)
                    }
                    reader.readAsDataURL(val.src)
                })
            })
        ).then((img:any)=>{
            setImages(img)
            // setPreview(img)
        }).catch(e=>console.log("Error Cok : ",e))
        // for (let i = 0; i < files.length; i++) {
        //     prev.push(URL.createObjectURL(files[i]))
        //     reader.readAsDataURL(files[i])
        //     reader.onload = async()=>{
        //         // setImages(reader.result)
        //     }
        // }
        // setPreview(prev)
        // const arrFiles:File[] = Array.from(files) 
    }
    function navigateImage(id:string) {
        if(id==='left') return index==0?setIndex(preview.length-1):setIndex(prev=>prev-=1)
        return index<(preview.length-1)?setIndex(prev=>prev+=1):setIndex(0)
    }
    function handleSaveImage() {
        // console.log(Object.values(images)[0])
        if(images) dispatch(addBanners({images:preview}))
    }
    console.log(images)
    const imgShow = preview.length? preview[index]:'https://placehold.co/1400x400?text=Image'
  return (
    <div className={`${style.main} w-full h-auto group relative flex-col gap-2`}>
        <input type="file" accept='image/*' hidden ref={imgref} onChange={handleImage} multiple />
        <Image src={imgShow} width={1024} height={500} className='h-[400px]' alt='banner' priority style={{objectFit:'contain'}} />
        <div className='flex items-center gap-4'>
            <Button classname='flex w-fit group-hover:bg-transparent backdrop-blur-[1px] top-0 left-0 justify-center items-center' onClick={()=>imgref.current.click()}>
                <PhotoIcon className='w-5 h-5 text-gray-600 stroke-2'/>
            </Button>
            <Button onClick={handleSaveImage} disabled={!images}>Save</Button>
        </div>
        <Button classname='!p-1 absolute top-[200px] flex w-fit border-none group-hover:bg-white backdrop-blur-[1px] left-1 justify-center items-center' onClick={()=>navigateImage('left')}>
            <ChevronLeftIcon className='w-5 h-5 text-gray-600 stroke-2'/>
        </Button>
        <Button classname='!p-1 absolute top-[200px] flex w-fit border-none group-hover:bg-white backdrop-blur-[1px] right-1 justify-center items-center' onClick={()=>navigateImage('right')}>
            <ChevronRightIcon className='w-5 h-5 text-gray-600 stroke-2'/>
        </Button>
    </div>
  )
}

export default BannerContainer