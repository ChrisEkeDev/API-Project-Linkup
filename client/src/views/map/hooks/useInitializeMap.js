import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function useMap() {
    const [ center, setCenter ] = useState(null);
    const sessionData = useSelector(state => state.sessions.allSessions);
    const sessions = Object.values(sessionData)

    const focusSession = (session) => {
      const center = {lat: session.Court.lat, lng: session.Court.lng}
      setCenter(center)
    }


    const initMap = () => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const center =  { lat: latitude, lng: longitude };
        setCenter(center)
      })

    }

    useEffect(() => {
      initMap()
    }, [])


  return { center, sessions, focusSession }
}

export default useMap
