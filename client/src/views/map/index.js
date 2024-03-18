
import { useState, useCallback } from 'react';
import { APIProvider, Map, MapCameraChangedEvent, MapCameraProps } from '@vis.gl/react-google-maps';
import MapMarker from './components/MapMarker';
import { getMapMarkers } from '../../store/sessions';
import { useQuery } from 'react-query';
import useMap from './hooks/useMap';
import LoadingData from '../../components/shared/loading';


function AppMap(props) {
  const INITIAL_PROPS = {
    center: {lat: 37.421512, lng: -122.084101},
    zoom: 10
  };
  const [ mapProps, setMapProps ] = useState(INITIAL_PROPS)
  // const { handleMapFocus, center } = useMap();
  const {
    data: mapMakers,
    isLoading: mapMakersLoading,
    error: mapMakersError
  } = useQuery(['all-sessions'], getMapMarkers)

  const handleMapChange = useCallback(e => setMapProps(e.detail))

  if (mapMakersLoading) return <LoadingData />
  if (mapMakersError) return <div>Error.</div>

  const markers = mapMakers?.data;



  return (
    <APIProvider
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      libraries={['marker']}>
      <Map
        mapId={'fc1ef067cfa808f9'}
        {...mapProps}
        onCameraChanged={handleMapChange}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {/* {
          markers.map(marker => (
            <MapMarker
              key={marker.id}
              marker={marker}
              handleMapFocus={() => console.log(marker)}
            />
          ))
        } */}
      </Map>
    </APIProvider>
  )
}

export default AppMap
