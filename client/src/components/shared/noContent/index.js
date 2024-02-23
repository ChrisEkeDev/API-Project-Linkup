import React from 'react'
import { useApp } from '../../../context/AppContext'
import './styles.scss';

function NoContent({icon: Icon, message}) {
    const { theme } = useApp();

  return (
    <div className={`no_content no_content-${theme}`}>
        {Icon && <Icon className='icon'/>}
        <p className='sm bold'>{message}</p>
    </div>
  )
}

export default NoContent
