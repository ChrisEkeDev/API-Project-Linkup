import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useApp } from '../../../context/AppContext';

function useMap() {
    const { locationServices, currentLocation, setCurrentLocation } = useApp();
    const sessionData = useSelector(state => state.sessions.allSessions);
    const markers = Object.values(sessionData)


    // useEffect(() => {
    //   initMap()
    // }, [currentLocation])


  return { markers }
}

export default useMap
