'use client'
import React, { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import Button from '@/components/Button/Button'
import {ChevronLeftIcon,ChevronRightIcon, PhotoIcon} from '@heroicons/react/24/outline'
import style from './BannerContainer.module.scss'
import { useRedux } from '@/redux/useRedux'
import { addBanners } from '@/redux/reducers/bannersReducer'
import { ImagesBanner } from '@/type'



function BannerContainer() {
    const {dispatch}=useRedux("admin")
    const [images,setImages] = useState<ImagesBanner[]>([])
    const [preview,setPreview] = useState<string[]>([])
    const [index,setIndex] = useState<number>(0)
    const imgref = useRef<any>()
    function handleImage() {
        const prev = []
        const files: FileList | null = imgref?.current?.files
        if(!files || !files.length) return
        const promise:Promise<{src:string,alt:string}>[] = Array.from(files).map(file=>{
            return new Promise((resolve,reject)=>{
                const reader = new FileReader()
                reader.onload = (e) => {
                    if (e.target) resolve({ src: e.target.result as string, alt: file.name })
                    else reject(new Error("FileReader target not available"))
                    
                }
                reader.onerror = (e) =>  reject(e)

                reader.readAsDataURL(file)
            })
        }) 
        Promise.all(promise).then(images=>{
            setImages(images)
            
        }).catch(e=> console.log('Error Image Upload : ',e))
        const images = Array.from(files)
        for(const image of images){
            prev.push(URL.createObjectURL(image))
        }
        setPreview(prev)
    }
    function navigateImage(id:string) {
        if(id==='left') return index==0?setIndex(preview.length-1):setIndex(prev=>prev-=1)
        return index<(preview.length-1)?setIndex(prev=>prev+=1):setIndex(0)
    }
    function handleSaveImage() {
        if(images) dispatch(addBanners({images:images}))
    }
    const imgShow = preview.length? preview[index]:'https://placehold.co/1400x400?text=Image'
  return (
    <div className={`${style.main} w-full h-auto group relative flex-col gap-2 items-center`}>
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