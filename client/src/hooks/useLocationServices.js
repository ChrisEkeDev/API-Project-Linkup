import React, { useState } from 'react'

function useLocationServices() {
    const [ currentLocation, setCurrentLocation ] = useState({
        lat: 37.422,
        lng: -122.084
    });
    const [ locationServices, setLocationServices ] = useState(false)

    return {
        currentLocation,
        setCurrentLocation,
        locationServices,
        setLocationServices,
    }
}

export default useLocationServices
