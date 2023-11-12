import React from 'react'
import './IconButton.scss';

function IconButton({action, icon: Icon}) {
  return (
    <button onClick={action} className='icon__button--wrapper'>
        <span className='icon__button--contents'>
            <Icon className='icon__button--icon'/>
        </span>
    </button>
  )
}

export default IconButton
