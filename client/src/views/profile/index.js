import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import './styles.scss';
import { useApp } from '../../context/AppContext';
import  useSettings from './hooks/useSettings';
import { page_transitions } from '../../constants/animations';
import Scroll from '../../components/shared/scroll';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ProfileImage from '../../components/shared/profileImage';
import Button from '../../components/shared/button';
import { formatDistance , parseISO } from 'date-fns';
import { TbLogout, TbTrash, TbMapPin, TbMapPinOff, TbBellRinging, TbBellOff, TbSun, TbMoon } from "react-icons/tb";
import { getAuth, signOut } from '../../store/auth';
import LoadingData from '../../components/shared/loading';
import { Redirect } from 'react-router-dom';

function Profile() {
    const client = useQueryClient();
    const { navigate } = useApp();
    const {
        data: auth,
        isLoading: authLoading,
        isError: authErr
      } = useQuery(['auth'], {
        queryFn: getAuth,
      });
    const { theme, locations, notifications, toggleTheme, toggleLocations, toggleNotifications } = useSettings();

    if (authLoading) return <LoadingData />
    if (authErr) return <Redirect to='/sign-in' />

    return (
        <motion.main {...page_transitions} className='page page_w_title'>
                <header className='page_header'>
                    <h2>My Profile</h2>
                </header>
                <Scroll>
                        <div className='profile_user_info float_left'>
                            <ProfileImage
                                player={auth}
                                size={5}
                            />
                            <div>
                                <p className='md bold'>{auth.name}</p>
                                <p className='sm'>Became a member {formatDistance(parseISO(auth?.createdAt), new Date())} ago</p>
                            </div>
                        </div>
                        <div className='profile_settings'>
                            <span className='section_label xs bold'>Settings</span>
                            <div onClick={toggleTheme} className='settings_toggle'>
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
                                            <TbSun  />
                                        </motion.div> :
                                        <motion.div key={'dark'} className='toggle_icon'>
                                            <TbMoon />
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                            <div onClick={toggleLocations} className='settings_toggle'>
                                <p className='xs'>{
                                    locations ?
                                    'Location On' :
                                    'Location Off'}
                                </p>
                                <AnimatePresence>
                                    {
                                        locations ?
                                        <motion.div key={'ON'} className='toggle_icon'>
                                            <TbMapPin />
                                        </motion.div> :
                                        <motion.div key={'OFF'} className='toggle_icon'>
                                            <TbMapPinOff />
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                            <div onClick={toggleNotifications} className='settings_toggle'>
                                <p className='xs'>{
                                    notifications ?
                                    'Notifications On' :
                                    'Notifications Off'}
                                </p>
                                <AnimatePresence>
                                    {
                                        notifications ?
                                        <motion.div key={'ON'} className='toggle_icon'>
                                            <TbBellRinging />
                                        </motion.div> :
                                        <motion.div key={'OFF'} className='toggle_icon'>
                                            <TbBellOff />
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className='profile_actions'>
                            <Button
                                label="Delete profile"
                                styles="warning"
                                icon={TbTrash}
                            />
                        </div>
                </Scroll>
        </motion.main>
    )
}

export default Profile
