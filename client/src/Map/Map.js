import React, { useEffect, useRef } from 'react';
import { useApp } from '../App/Context/AppContext';

function Map() {
    const { theme, initializeMap, refreshMapTheme } = useApp();
    const ref = useRef();

    useEffect(() => {
        initializeMap(ref);
    }, []);

    useEffect(() => {
        refreshMapTheme(ref);
    }, [theme])

    return (
        <div className='map_container' ref={ref}></div>
    )
}

export default Map
