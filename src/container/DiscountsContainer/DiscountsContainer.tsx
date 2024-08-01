import Category from '@/components/Category/Category'
import EmptyComponent from '@/components/EmptyComponent/EmptyComponent'
import { DiscountInputType } from '@/type'
import style from './DiscountsContainer.module.scss'
import Discount from '@/components/Discount/Discount'

function DiscountsContainer({data}:{data:DiscountInputType[]}) {
  return (
    <div className={style.main}>
        {
            data?.length?data.map(val=> <Discount {...val} key={val.id} />):<EmptyComponent/>
        }
    </div>
  )
}

export default DiscountsContainer