import React, { useEffect, useRef } from 'react';
import { useApp } from '../App/Context/AppContext';
import useInitilizeMap from "./hooks/useInitializeMap";

function Map() {
    const ref = useRef();
    const [map, initializeMap] = useInitilizeMap();

    useEffect(() => {
        initializeMap(ref)
    }, [])

    return (
        <div className='map_container' ref={ref}></div>
    )
}

export default Map
