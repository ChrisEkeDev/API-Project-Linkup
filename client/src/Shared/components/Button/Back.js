import React from 'react'
import { useApp } from '../../../App/Context/AppContext';
import { TbArrowLeft } from 'react-icons/tb';

function Back() {
    const { goBack } = useApp();

  return (
    <div className='sessions__single_page--header-back'>
        <span onClick={() => goBack(-1)} className='sessions__single_page--back'>
            <TbArrowLeft />
        </span>
        <span>Back to results</span>
    </div>
  )
}

export default Back
