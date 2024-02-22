import React from 'react'
import { useApp } from '../../../context/AppContext';
import './styles.scss';

function IconButton({action, icon: Icon, styles , label}) {
  const { theme } = useApp();

  return (
    <button title={label} onClick={action} className={`icon_button icon_button-${theme} ${styles}`}>
      {/* <div className='icon_circle'> */}
        <Icon className='icon'/>
      {/* </div> */}
    </button>
  )
}

export default IconButton
