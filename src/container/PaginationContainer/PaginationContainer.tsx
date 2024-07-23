'use client'
import style from './PaginationContainer.module.scss'
interface PaginationType{
  totalData:number
  amount:number
  page:number
}
function PaginationContainer({amount,page,totalData}:PaginationType) {
  const totalPage = totalData/amount
  return (
    <div className={style.main}>
      
    </div>
  )
}

export default PaginationContainer