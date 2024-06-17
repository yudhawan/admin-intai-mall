
type valueProps = string | object | number | boolean | object[] | number[] | string[]
type setItemProp = {
    key:string
    value:string | object | number | boolean | object[] | number[] | string[]
}
const useLocalStorage = (namespace?:string)=>{
    const prefix = namespace?namespace:'default'
    const getItem =(props:string)=>{
        let value:valueProps= localStorage.getItem(`${prefix}:${props}`) || ''
        try {
            const result = JSON.parse(value)
            return result
        } catch (error) {
            return value
        }
       
    }
    const setItem =(props:setItemProp)=>{
        localStorage.setItem(`${prefix}:${props.key}`,JSON.stringify(props.value))
        return props
    }
    const removeItem = (props:string)=>{
        localStorage.removeItem(`${prefix}:${props}`)
    }
    const clear = ()=>{
        localStorage.clear()
    }

    return {getItem,setItem,removeItem,clear}
}

export default useLocalStorage