
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import useMap from './hooks/useInitializeMap';
import { useSelector } from 'react-redux';
import SessionMarker from './components/SessionMarker';
import { useEffect } from 'react';

function MapWrapper(props) {
  const { center, sessions, focusSession  } = useMap()


  useEffect(() => {

  }, [])

  if (!center) return <div></div>

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={['marker']}>
      <Map
        mapId={'fc1ef067cfa808f9'}
        zoom={10}
        center={center}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {
          sessions.map(session => (
            <SessionMarker {...{focusSession, session}} />
          ))
        }

      </Map>
    </APIProvider>
  )
}

export default MapWrapper
