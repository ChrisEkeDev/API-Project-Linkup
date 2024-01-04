import React from 'react'
import { motion } from 'framer-motion';
import './styles.scss';
import { useApp } from '../../context/AppContext';
import * as ROUTE from '../../constants/routes';
import { parent_variants, base_animations, page_transitions } from '../../constants/animations';
import LoadingData from '../../components/shared/loading';
import Scroll from '../../components/shared/scroll';
import ProfileImage from '../../components/shared/profileImage';
import Button from '../../components/shared/button';
import { TbLogout, TbTrashFilled } from 'react-icons/tb';

function Profile() {
    const { auth, signOut, setLoading } = useApp();

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
                        icon={TbLogout}
                        action={handleSignOut}
                    />
                </header>
                <Scroll>
                        <div className='profile_user_info float_left'>
                            <ProfileImage
                                size={5}
                            />
                            <div>
                                <p className='sm bold'>{auth.name}</p>
                                <p className='xs'>Member Since {}</p>
                            </div>
                        </div>
                        <div className='profile_actions'>
                            <Button
                                label="Delete profile"
                                styles="warning"
                                icon={TbTrashFilled}
                            />
                        </div>
                </Scroll>
        </motion.main>
    )
}

export default Profile
