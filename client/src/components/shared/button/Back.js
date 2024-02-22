import React from 'react'
import { useApp } from '../../../context/AppContext';

import { TbArrowLeft } from 'react-icons/tb';

function Back({route, styles }) {
    const { goBack, theme } = useApp();

  return (
    <div onClick={() => goBack(route)} className={`back_button back_button-${theme} ${styles}`}>
        <TbArrowLeft className='icon'/>
    </div>
  )
}

export default Back
