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
        <motion.main {...page_transitions} className='page profile'>
                <header className='profile_header'>
                    <h2>{auth.name}'s Profile</h2>
                    <Button
                        label="SignOut"
                        styles="primary"
                        icon={TbLogout}
                        action={handleSignOut}
                    />
                </header>

                {/* <ProfileImage size={7}/>
                <div className='profile_actions'>
                    <Button
                        label="Delete profile"
                        styles="warning"
                        icon={TbTrashFilled}
                    />
                </div> */}
        </motion.main>
    )
}

export default Profile
