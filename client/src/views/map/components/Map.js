import React, { useEffect, useRef } from 'react';
import useInitilizeMap from "../hooks/useInitializeMap";
import { useSelector } from 'react-redux';

function Map() {
    const session = useSelector(state => state.sessions.singleSession);
    const ref = useRef();
    const { map, initMap, focusSession } = useInitilizeMap();

    useEffect(() => {
        initMap(ref)
    }, [])

    // useEffect(() => {
    //     focusSession(session)
    // }, [session])

    return (
        <div className='map_container' ref={ref}>

        </div>
    )
}

export default Map
