import React, { useEffect, useRef } from 'react';
import useInitilizeMap from "../hooks/useInitializeMap";
import { useSelector } from 'react-redux';

// function Map() {
//     const ref = useRef();
//     const { map, initMap, focusSession } = useInitilizeMap();

//     useEffect(() => {
//         initMap(ref)
//     }, [])

//     // useEffect(() => {
//     //     focusSession(session)
//     // }, [session])

//     return (
//         null
//         // <div className='map_container' ref={ref}>

//         // </div>
//     )
// }

// export default Map
