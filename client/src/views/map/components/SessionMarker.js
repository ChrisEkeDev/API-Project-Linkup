import React from 'react'
import marker from '../../../assets/bclogo.svg'
import { useApp } from '../../../context/AppContext';
import '../styles.scss'


import {
    AdvancedMarker,
  } from '@vis.gl/react-google-maps';

function SessionMarker({session, focusSession}) {
    const { navigate } = useApp();

    const handleClick = () => {
        focusSession(session)
        navigate(`/sessions/${session.id}`)
    }

    return (
        <AdvancedMarker
            position={{lat: session.Court.lat, lng: session.Court.lng}}
            title={session.name}
            onClick={handleClick}
        >
            <div className='map_marker'>
                <img src={marker} className='marker_icon'/>
                <span className='marker_text'>{session.name}</span>
            </div>
        </AdvancedMarker>
    )
}

export default SessionMarker
