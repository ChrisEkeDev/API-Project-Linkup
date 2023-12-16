import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import './styles.scss'

function LoadingData() {
  return (
    <div className='loading'>
        <CgSpinner className='spinner'/>
    </div>
  )
}

export default LoadingData
