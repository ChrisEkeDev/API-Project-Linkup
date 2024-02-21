import React from 'react'
import { useApp } from '../../../context/AppContext';
import { TbCircle } from 'react-icons/tb'

function SessionPlaceResult({result, onSelect}) {
  const { settings } = useApp();
    const settingsData = settings?.data;
    const { theme } = settingsData;

    return (
      <li className={`result_item result_item-${theme}`} onClick={() => onSelect(result)}>
          <TbCircle className='icon'/>
          <div>
              <p className='sm bold'>{result.name}</p>
              <p className='sm'>{result.formatted_address}</p>
          </div>
      </li>
    )
}

export default SessionPlaceResult
