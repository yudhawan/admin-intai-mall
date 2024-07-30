import Category from '@/components/Category/Category'
import EmptyComponent from '@/components/EmptyComponent/EmptyComponent'
import { CategoryProp } from '@/type'
import style from './CategoriesContainer.module.scss'

function CategoriesContainer({data}:{data:CategoryProp[]}) {
  return (
    <div className={style.main}>
        {
            data?.length?data.map(val=> <Category {...val} key={val.id} />):<EmptyComponent/>
        }
    </div>
  )
}

export default CategoriesContainer