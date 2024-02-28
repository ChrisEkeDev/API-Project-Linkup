import { useApp } from '../../../context/AppContext';
import  { AdvancedMarker } from '@vis.gl/react-google-maps';
import ProfileImage from '../../../components/shared/profileImage';
import '../styles.scss'

function SessionMarker({marker, handleMapFocus}) {

    return (
        <AdvancedMarker
            position={{lat: marker.lat, lng: marker.lng}}
            title={marker.name}
            onClick={handleMapFocus}
        >
            <div className={`map_marker`}>
                <div className='marker_info'>
                    <div className='marker_text'>
                        <span className='xs'>{marker.name}</span>
                        <span className='bold sm'>{marker.address}</span>
                    </div>
                </div>
                <span className='marker_count bold md'>30</span>
            </div>
        </AdvancedMarker>
    )
}

export default SessionMarker
