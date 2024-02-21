import { AnimatePresence, motion } from "framer-motion"
import List from "../../components/shared/layout/List"
import Scroll from '../../components/shared/scroll';
import { useApp } from "../../context/AppContext";
import PageContainer from "../../components/shared/layout/PageContainer"
import PageHeader from "../../components/shared/layout/PageHeader"
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
    } = useApp();

    if (settingsLoading) return <LoadingData/>

    const settingsData = settings?.data;
    const { theme, locations, notifications } = settingsData;


    return (
        <PageContainer>
            <PageHeader>
                <header className='float_left flex_full fixed_header'>
                    <h2>Settings</h2>
                </header>
            </PageHeader>
            <Scroll>
                <List>
                <div onClick={onToggleTheme}  className={`settings_toggle settings_toggle-${theme}`}>
                        <p className='sm bold'>
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
                    <div onClick={onToggleLocations} className={`settings_toggle settings_toggle-${theme}`}>
                        <p className='sm bold'>
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
                    <div onClick={onToggleNotifications} className={`settings_toggle settings_toggle-${theme}`}>
                        <p className='sm bold'>
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
                </List>
            </Scroll>
        </PageContainer>
    )
}

export default Settings
