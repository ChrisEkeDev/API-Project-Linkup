import React from 'react'
import { useApp } from '../../../context/AppContext';
import { TbArrowLeft } from 'react-icons/tb';

function Back() {
    const { goBack } = useApp();

  return (
    <div onClick={() => goBack()} className='back--button'>
        <TbArrowLeft className='icon'/>
        <span>Go Back</span>
    </div>
  )
}

export default Back
