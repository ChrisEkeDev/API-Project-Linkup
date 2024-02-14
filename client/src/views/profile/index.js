import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import './styles.scss';
import { useApp } from '../../context/AppContext';
import { page_transitions } from '../../constants/animations';
import Scroll from '../../components/shared/scroll';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ProfileImage from '../../components/shared/profileImage';
import Button from '../../components/shared/button';
import { formatDistance , parseISO } from 'date-fns';
import { TbEdit, TbTrash } from "react-icons/tb";
import { getAuth } from '../../store/auth';
import LoadingData from '../../components/shared/loading';
import { Redirect } from 'react-router-dom';

function Profile() {
    const {
        data: auth,
        isLoading: authLoading,
        isError: authErr
    } = useQuery(['auth'], {
        queryFn: getAuth,
    });

    if (authLoading) return <LoadingData />
    if (authErr) return <Redirect to='/sign-in' />

    const authData = auth.data;

    return (
        <motion.main {...page_transitions} className='page page_w_title'>
                <header className='page_header'>
                    <h2>My Profile</h2>
                    <Button
                        label='Update Profile'
                        styles="primary"
                        icon={TbEdit}
                    />
                </header>
                <Scroll>
                    <div className='profile_user_info float_left'>
                        <ProfileImage
                            player={auth}
                            size={5}
                        />
                        <div>
                            <p className='md bold'>{authData.name}</p>
                            <p className='sm'>Became a member {formatDistance(parseISO(authData?.createdAt), new Date())} ago</p>
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
