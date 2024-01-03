import React from 'react'
import '../styles.scss';
import Button from '../../../components/shared/button';
import { useApp } from '../../../context/AppContext';
import { TbMapPinCheck, TbMapPinOff } from 'react-icons/tb';

function LocationServices() {
    const { navigate, setLocationServices } = useApp();

    const handleLocationServices = (boolean) => {
        setLocationServices(boolean);
        navigate('/sessions')
    }

    return (
        <main className='page location_services'>
            <section className='location_container'>
                <h2>Enable Location Services?</h2>
                <p>To enhance your experience and help you find the best recreation basketball games in your area, we'd like to access your location. Rest assured, we prioritize your privacy and will only use your location for this purpose. Will you grant us permission?</p>
                <div className='location_actions'>
                    <Button
                        label='Not this time'
                        styles="tertiary"
                        icon={TbMapPinOff}
                        action={() => handleLocationServices(false)}
                    />
                    <Button
                        label="Let's do it"
                        styles="primary"
                        icon={TbMapPinCheck}
                        action={() => handleLocationServices(true)}
                    />
                </div>
            </section>
        </main>
    )
}

export default LocationServices
