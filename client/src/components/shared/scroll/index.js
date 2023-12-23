import React from 'react'
import './styles.scss'


function Scroll({children}) {
  return (
    <section className='scroll_window'>
        {children}
    </section>
  )
}

export default Scroll
