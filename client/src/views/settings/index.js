import React from 'react'
import { motion } from 'framer-motion';
import './styles.scss';
import { useApp } from '../../context/AppContext';
import { page_transitions } from '../../constants/animations';
import { TbMapPin, TbMapPinOff, TbMoon, TbSun } from 'react-icons/tb';
import Scroll from '../../components/shared/scroll';

function Settings() {
    const { theme, handleTheme, locationServices, setLocationServices } = useApp();

    return (
        <motion.main {...page_transitions} className='page page_w_title'>
                <header className='page_header'>
                        <h2>Settings</h2>
                </header>
                <Scroll>

                    <div onClick={handleTheme} className='settings_toggle'>
                        <span className='section_label xs bold'>Theme</span>
                        <p className='bold sm'>{
                            theme === 'light' ?
                            'Light Theme' :
                            'Dark Theme'}
                        </p>
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
                        <span className='section_label xs bold'>Location</span>
                        <p className='bold sm'>{
                            locationServices ?
                            'Location On' :
                            'Location Off'}
                        </p>
                        {
                            locationServices ?
                            <TbMapPin className='toggle_icon'/> :
                            <TbMapPinOff className='toggle_icon' />
                        }
                    </div>
                </Scroll>
        </motion.main>
    )
}

export default Settings
