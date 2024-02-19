import React from 'react'
import { TbCircleDot } from 'react-icons/tb'

function SessionPlaceResult({result, onSelect}) {
  return (
    <li className='result_item' onClick={() => onSelect(result)}>
        <TbCircleDot className='icon'/>
        <div>
            <p className='sm bold'>{result.name}</p>
            <p className='sm'>{result.formatted_address}</p>
        </div>
    </li>
  )
}

export default SessionPlaceResult
