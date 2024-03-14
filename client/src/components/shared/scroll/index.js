import React, { forwardRef } from 'react'
import './styles.scss'


const Scroll = forwardRef((props, ref) => {
  const { children, styles } = props;
  return (
    <section ref={ref} className={`scroll_window ${styles}`}>
        {children}
    </section>
  )
})

export default Scroll
