"use client"
import style from './FeedbackContainer.module.scss'
function FeedbackContainer() {
  return (
    <div className={style.main}>
        <section className='w-full h-full'>feeds</section>
        <section className='w-full h-full'>filter</section>
    </div>
  )
}

export default FeedbackContainer