import React from 'react'
import { TbBan, TbSlash } from "react-icons/tb";
import { useApp } from '../../../context/AppContext'
import './styles.scss';

function NoContent({icon: Icon, message}) {
    const { theme } = useApp();

  return (
    <div className={`no_content no_content-${theme}`}>
        {Icon &&
          <div className='no_content-icon_wrapper'>
            <TbSlash className='no_content-slash'/>
            <Icon className='icon'/>
          </div>
        }
        <p className='sm bold'>{message}</p>
    </div>
  )
}

export default NoContent
