import React from 'react'
import { PiCircleFill } from 'react-icons/pi'

function SessionPlaceResult({result, onSelect}) {
  return (
    <li className='result_item' onClick={() => onSelect(result)}>
        <PiCircleFill className='icon'/>
        <div>
            <p className='sm bold'>{result.name}</p>
            <p className='sm'>{result.formatted_address}</p>
        </div>
    </li>
  )
}

export default SessionPlaceResult
