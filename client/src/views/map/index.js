
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import useMap from './hooks/useInitializeMap';
import SessionMarker from './components/SessionMarker';
import { useApp } from '../../context/AppContext';
import { useEffect } from 'react';

function MapWrapper(props) {
  // const { markers } = useMap()

  useEffect(() => {

  }, [])


  return (
    // null
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={['marker']}>
      <Map
        mapId={'fc1ef067cfa808f9'}
        zoom={10}
        center={{lat: 82.5254852, lng: 140.5265426}}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {/* {
          markers.map(marker => (
            <SessionMarker {...{setCurrentLocation, marker}} />
          ))
        } */}

      </Map>
    </APIProvider>
  )
}

export default MapWrapper
