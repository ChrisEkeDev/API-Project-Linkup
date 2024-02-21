import React from 'react'
import { useApp } from '../../../context/AppContext';

import { TbArrowLeft } from 'react-icons/tb';

function Back({route, styles }) {
    const { goBack, settings } = useApp();
    const settingsData = settings?.data;
  const { theme } = settingsData;

  return (
    <div onClick={() => goBack(route)} className={`back_button back_button-${theme} ${styles}`}>
        <TbArrowLeft className='icon'/>
    </div>
  )
}

export default Back
