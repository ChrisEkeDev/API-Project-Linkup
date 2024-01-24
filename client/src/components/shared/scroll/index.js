import React, { forwardRef } from 'react'
import './styles.scss'


const Scroll = forwardRef((props, ref) => {
  const { children } = props;
  return (
    <section ref={ref} className='scroll_window'>
        {children}
    </section>
  )
})

export default Scroll
