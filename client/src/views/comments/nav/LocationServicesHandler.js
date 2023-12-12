import React from 'react';
import { useApp } from '../App/Context/AppContext';
import { TbMapPin, TbMapPinOff } from 'react-icons/tb';

function LocationServicesHandler() {
    const { locationServices, handleLocationServices } = useApp();
    return (
        <div className='navigation_setting_wrapper'>
            <div onClick={handleLocationServices} className='navigation_setting_contents'>
                <span className='navigation_setting_label' >
                {
                    locationServices ?
                    'Location Enabled' :
                    'Location Disabled'
                }
                </span>
                {
                    locationServices ?
                    <TbMapPin className='navigation_setting_icon'/> :
                    <TbMapPinOff className='navigation_setting_icon'/>
                }
            </div>
        </div>
    )
}

export default LocationServicesHandler
