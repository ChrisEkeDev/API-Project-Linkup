import React from 'react'
import markerImg from '../../../assets/bclogo.svg'
import { useApp } from '../../../context/AppContext';
import { useSelector } from 'react-redux';
import '../styles.scss'


import {
    AdvancedMarker,
  } from '@vis.gl/react-google-maps';
import ProfileImage from '../../../components/shared/profileImage';
import { TbDivide } from 'react-icons/tb';

function SessionMarker({marker}) {
    const { navigate, setCurrentLocation } = useApp();
    const session = useSelector(state => state.sessions.singleSession)
    const isActive = marker.id == session.id

    const handleClick = () => {
        setCurrentLocation({lat: marker.Court.lat, lng: marker.Court.lng})
        navigate(`/sessions/${marker.id}`)
    }

    return (
        <AdvancedMarker
            position={{lat: marker.Court.lat, lng: marker.Court.lng}}
            title={marker.name}
            onClick={handleClick}
        >
            <div className={`map_marker ${isActive && 'active_marker'}`}>
                <div className='marker_info'>
                    <ProfileImage
                    size={2}
                    />
                    <div className='marker_text'>
                        <span className='bold sm'>{marker.creator.name}</span>
                        <span className='xs'>{marker.name}</span>
                    </div>
                </div>
                <span className='marker_count bold md'>30</span>
            </div>
        </AdvancedMarker>
    )
}

export default SessionMarker
