import React from 'react'
import './styles.scss';

function IconButton({action, icon: Icon, styles}) {
  return (
    <button onClick={action} className={`icon-button ${styles}`}>
      <Icon className='icon'/>
    </button>
  )
}

export default IconButton
