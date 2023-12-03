import React, { useState, useEffect } from 'react'
import { useApp } from '../../App/Context/AppContext';
import { appThemes } from '../../Shared/constants/predefinedValues';

function useInitilizeMap() {
    const [ map, setMap ] = useState({});
    const { theme, currentLocation } = useApp();
    //console.log(theme)

    const initializeMap = (ref) => {
        const mapOptions = {
          // mapId: appThemes[theme].mapId,
          center: currentLocation,
          zoom: 15,
          disableDefaultUI: true
        };
        const newMap = new window.google.maps.Map(ref.current, mapOptions);
        setMap(newMap);
    }

  return [map, initializeMap]
}

export default useInitilizeMap
