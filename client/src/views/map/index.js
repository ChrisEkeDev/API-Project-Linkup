
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import SessionMarker from './components/SessionMarker';
import { getMapMarkers } from '../../store/sessions';
import { useQuery } from 'react-query';
import useMap from './hooks/useMap';
import LoadingData from '../../components/shared/loading';

function AppMap(props) {
  const { handleMapFocus, center } = useMap();
  const {
    data: mapMakers,
    isLoading: mapMakersLoading,
    error: mapMakersError
  } = useQuery(['all-sessions'], getMapMarkers)


  if (mapMakersLoading) return <LoadingData />
  if (mapMakersError) return <div>Error.</div>

  const markers = mapMakers?.data;

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={['marker']}>
      <Map
        mapId={'fc1ef067cfa808f9'}
        zoom={10}
        defaultCenter={center}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {/* {
          markers.map(marker => (
            <SessionMarker
              marker={marker}
              handleMapFocus={handleMapFocus}
            />
          ))
        } */}
      </Map>
    </APIProvider>
  )
}

export default AppMap
