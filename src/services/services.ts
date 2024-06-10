import { Dispatch, SetStateAction } from "react"

export const numberFormatMoney = (val:number)=>{
    const currency = new Intl.NumberFormat('en-En',{
        style:'currency',
        currency:'USD',
    }).format(val)
    return currency
}
export const handleValidationForm = (obj:object,setValidation:Dispatch<SetStateAction<string[]>>):string[]=>{
    const checkValue = (value:any):boolean=> value===null || value===undefined || (typeof value==='string' && value.trim()==='') || (typeof value==='object' && Object.keys(value).every(checkValue))
    const emptyKeys:string[]=[]
    const checkProp = (obj:any,currentPath=''):void=>{
        for (const key in obj) {
            const value = obj[key]
            const path= currentPath?`${currentPath}.${key}`:key
            if(checkValue(value)) emptyKeys.push(key)
            else if(typeof value ==='object') checkProp(value,path)
        }
    }
    checkProp(obj)
    return emptyKeys
}
type ImgReaderProp = {
    images: File[] | undefined
}
export const ImageReader = (val:ImgReaderProp)=>{
    const tmp:any=[]
    let reader = new FileReader()
    if(Array.isArray(val.images)){
        val.images?.forEach(val=>{
            reader.readAsDataURL(val)
            reader.onload=async()=>{
                const result:string | ArrayBuffer | null = reader.result
                tmp.push(result)
            }
        })
        
    }
    return tmp
}