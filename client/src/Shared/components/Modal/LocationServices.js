import React from 'react'
import Button from '../Button';
import { useApp } from '../../../context/AppContext';
import { TbCurrentLocation } from 'react-icons/tb';

function LocationServices(props) {
    const { closeModal, size } = props;
    const { handleAlerts, setLoading, setLocationServices, navigate } = useApp();

    const enableLocationServices = () => {
        setLocationServices(true);
        closeModal();
        navigate("/")
    }

    const rejectLocationServices = () => {
        closeModal();
        navigate("/")
    }

    return (
        <div className={`modal_contents modal_contents--${size}`}>
            <div className='modal_image'>
                <TbCurrentLocation/>
            </div>
            <h2 className='modal_title'>Turn on location services.</h2>
            <p className='modal_body'>To enhance your app experience and help you discover sessions near you, we need access to your location. Rest assured, we prioritize your privacy. We only use your location to improve your app experience and do not share it with third parties. Note: You can change your location preferences in the app settings at any time.</p>
            <div className='modal_actions'>
                <Button
                    action={enableLocationServices}
                    label="Enable Location Services"
                    style="modal_button"
                    type="primary"
                />
                <Button
                    action={rejectLocationServices}
                    label="Not now"
                    style="modal_button"
                    type="secondary"
                />
            </div>
        </div>
  )
}

export default LocationServices
