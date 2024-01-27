import React from 'react'
import { useApp } from '../../../context/AppContext';
import { TbArrowLeft } from 'react-icons/tb';

function Back({route, styles }) {
    const { goBack } = useApp();

  return (
    <div onClick={() => goBack(route)} className={`back--button ${styles}`}>
        <TbArrowLeft className='icon'/>
    </div>
  )
}

export default Back
