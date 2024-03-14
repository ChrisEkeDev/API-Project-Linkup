import React from 'react'
import { useApp } from '../../../context/AppContext';

function SeeMore({action, label}) {
    const { theme } = useApp();
    return (
        <button onClick={action} className={`more_button more_button-${theme}`}>
            <span className='bold sm'>{label}</span>
        </button>
    )
}

export default SeeMore
