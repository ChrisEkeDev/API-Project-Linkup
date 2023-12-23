import React from 'react'
import './styles.scss';

function IconButton({action, icon: Icon, styles , name}) {
  return (
    <button title={name} onClick={action} className={`icon_button ${styles}`}>
      {/* <div className='icon_circle'> */}
        <Icon className='icon'/>
      {/* </div> */}
    </button>
  )
}

export default IconButton
