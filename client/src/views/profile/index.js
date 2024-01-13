import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import './styles.scss';
import { useApp } from '../../context/AppContext';
import { page_transitions } from '../../constants/animations';
import Scroll from '../../components/shared/scroll';
import ProfileImage from '../../components/shared/profileImage';
import Button from '../../components/shared/button';
import { PiSignOutBold, PiTrashBold, PiMapPinBold , PiMoonStarsBold, PiSunHorizonBold   } from 'react-icons/pi';
import { formatDistance , parseISO } from 'date-fns';

function Profile() {
    const { auth, signOut, setLoading, theme, handleTheme, locationServices, setLocationServices } = useApp();
    const formattedDate = formatDistance (parseISO(auth.createdAt), new Date())

    const handleSignOut = () => {
        setLoading(true)
        try {
            signOut()
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }


    return (
        <motion.main {...page_transitions} className='page page_w_title'>
                <header className='page_header'>
                    <h2>Dashboard</h2>
                    <Button
                        label="SignOut"
                        styles="primary"
                        icon={PiSignOutBold}
                        action={handleSignOut}
                    />
                </header>
                <Scroll>
                        <div className='profile_user_info float_left'>
                            <ProfileImage
                                player={auth}
                                size={5}
                            />
                            <div>
                                <p className='md bold'>{auth.name}</p>
                                <p className='sm'>Became a member {formattedDate} ago</p>
                            </div>
                        </div>
                        {/* <div className='profile_stats'>
                            <span className='section_label xs bold'>Player Stats </span>
                                <div className='stat'>
                                    <p className='bold lg'>24</p>
                                    <p className='bold xs uppercase'>Player Hours</p>
                                </div>
                                <div className='stat'>
                                    <p className='bold lg'>12</p>
                                    <p className='bold xs uppercase'>Sessions</p>
                                </div>
                                <div className='stat'>
                                    <p className='bold lg'>20</p>
                                    <p className='bold xs uppercase'>Active Hours</p>
                                </div>
                        </div> */}
                        <div className='profile_settings'>
                            <span className='section_label xs bold'>Settings</span>
                            <div onClick={handleTheme} className='settings_toggle'>
                                <p className='xs'>
                                    {
                                    theme === 'light' ?
                                    'Light Theme' :
                                    'Dark Theme'
                                    }
                                </p>
                                <AnimatePresence>
                                    {
                                        theme === 'light' ?
                                        <motion.div key={'light'} className='toggle_icon'>
                                            <PiSunHorizonBold />
                                        </motion.div> :
                                        <motion.div key={'dark'} className='toggle_icon'>
                                            <PiMoonStarsBold />
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                            <div onClick={
                                locationServices ?
                                () => setLocationServices(false) :
                                () => setLocationServices(true)
                                } className='settings_toggle'>
                                <p className='xs'>{
                                    locationServices ?
                                    'Location On' :
                                    'Location Off'}
                                </p>
                                <AnimatePresence>
                                    {
                                        locationServices ?
                                        <motion.div key={'ON'} className='toggle_icon'>
                                            <PiMapPinBold/>
                                        </motion.div> :
                                        <motion.div key={'OFF'} className='toggle_icon'>
                                            <PiMapPinBold/>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className='profile_actions'>
                            <Button
                                label="Delete profile"
                                styles="warning"
                                icon={PiTrashBold }
                            />
                        </div>
                </Scroll>
        </motion.main>
    )
}

export default Profile
