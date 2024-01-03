
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import useMap from './hooks/useInitializeMap';
import { useSelector } from 'react-redux';
import SessionMarker from './components/SessionMarker';
import { useApp } from '../../context/AppContext';
import { useEffect } from 'react';

function MapWrapper(props) {
  const { markers } = useMap()
  const { currentLocation, setCurrentLocation } = useApp();

  useEffect(() => {

  }, [])


  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={['marker']}>
      <Map
        mapId={'fc1ef067cfa808f9'}
        zoom={10}
        center={currentLocation}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {
          markers.map(marker => (
            <SessionMarker {...{setCurrentLocation, marker}} />
          ))
        }

      </Map>
    </APIProvider>
  )
}

export default MapWrapper
