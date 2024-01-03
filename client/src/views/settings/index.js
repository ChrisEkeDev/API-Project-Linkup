import React from 'react'
import { motion } from 'framer-motion';
import './styles.scss';
import { useApp } from '../../context/AppContext';
import * as ROUTE from '../../constants/routes';
import { parent_variants, base_animations, page_transitions } from '../../constants/animations';
import LoadingData from '../../components/shared/loading';
import Scroll from '../../components/shared/scroll';
import { TbMapPin, TbMapPinOff, TbMoon, TbSun } from 'react-icons/tb';

function Settings() {
    const { theme, handleTheme, locationServices, setLocationServices } = useApp();

    return (
        <motion.main {...page_transitions} className='page settings'>
            <form className='settings_form'>
                <header className='form_header'>
                    <h2>Settings</h2>
                </header>
                <div onClick={handleTheme} className='settings_toggle'>
                    <span className='bold'>{
                        theme === 'light' ?
                        'Light Theme' :
                        'Dark Theme'}
                    </span>
                    {
                        theme === 'light' ?
                        <TbSun  className='toggle_icon' /> :
                        <TbMoon  className='toggle_icon' />
                    }
                </div>
                <div onClick={
                    locationServices ?
                    () => setLocationServices(false) :
                    () => setLocationServices(true)
                    } className='settings_toggle'>
                    <span className='bold'>{
                        locationServices ?
                        'Location Serivces On' :
                        'Location Serivces Off'}
                    </span>
                    {
                        locationServices ?
                        <TbMapPin className='toggle_icon'/> :
                        <TbMapPinOff className='toggle_icon' />
                    }
                </div>

            </form>
        </motion.main>
    )
}

export default Settings
