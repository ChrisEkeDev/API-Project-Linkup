import React from 'react'
import './styles.scss'

function Form({children, title}) {
  return (
    <form className='form pad_full'>
        <h2>{title}</h2>
        {children}
    </form>
  )
}

export default Form
