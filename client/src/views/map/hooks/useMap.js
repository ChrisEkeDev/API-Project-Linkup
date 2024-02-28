import { useEffect, useState } from 'react'
import { useApp } from '../../../context/AppContext';

function useMap() {
    const [ center, setCenter ] = useState({lat: 37.421512, lng: -122.084101})
    const { navigate } = useApp();

    const handleMapFocus = (marker) => {
        setCenter({lat: marker.lat, lng: marker.lng})
        navigate(`/sessions/${marker.id}`)
    }

    useEffect(() => {
      console.log(center)
    }, [center])


  return { handleMapFocus, center }
}

export default useMap
