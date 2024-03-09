import { useEffect, useState } from 'react'
import { useApp } from '../../../context/AppContext';
import { set } from 'date-fns';

function useMap() {
    const [ center, setCenter ] = useState({lat: 33.4151843, lng: -111.8314724})
    const { navigate } = useApp();

    const handleCenter = (data) => {
      const node = { lat: data.lat, lng: data.lng };
      console.log(node)
      setCenter(node)
    }

    const handleMapFocus = (marker) => {
        handleCenter(marker)
        navigate(`/sessions/${marker.id}`)
    }

  return { handleMapFocus, center }
}

export default useMap
