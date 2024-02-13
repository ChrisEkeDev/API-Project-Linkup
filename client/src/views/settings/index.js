import { AnimatePresence, motion } from "framer-motion"
import { page_transitions } from '../../constants/animations';
import Scroll from '../../components/shared/scroll';
import  useSettings from './hooks/useSettings';
import { TbMapPin, TbMapPinOff, TbBellRinging, TbBellOff, TbSun, TbMoon } from "react-icons/tb";
import './styles.scss';
import LoadingData from "../../components/shared/loading";


function Settings() {
    const {
        settingsLoading,
        settings,
        onToggleTheme,
        onToggleLocations,
        onToggleNotifications
    } = useSettings();

    if (settingsLoading) return <LoadingData/>

    const { theme, locations, notifications } = settings;

    return (
        <motion.main {...page_transitions} className='page page_w_title'>
            <header className='page_header'>
                <h2>Settings</h2>
            </header>
            <Scroll>
                <div className='profile_settings'>
                    <div onClick={onToggleTheme} className='settings_toggle'>
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
                    <div onClick={onToggleLocations} className='settings_toggle'>
                        <p className='xs'>
                            {
                                locations ?
                                'Location On' :
                                'Location Off'
                            }
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
                    <div onClick={onToggleNotifications} className='settings_toggle'>
                        <p className='xs'>
                            {
                                notifications ?
                                'Notifications On' :
                                'Notifications Off'
                            }
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
            </Scroll>
        </motion.main>
    )
}

export default Settings