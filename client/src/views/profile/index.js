import React from 'react'
import useAuth from '../../views/auth/hooks/useAuth'
import './styles.scss';
import { useApp } from '../../context/AppContext';
import SignOutModal from '../../components/navbar/components/SignOutModal';
import useModal from '../../hooks/useModal';
import Modal from '../../components/shared/modal';
import Scroll from '../../components/shared/scroll';
import { useQuery } from 'react-query';
import ProfileImage from '../../components/shared/profileImage';
import Button from '../../components/shared/button';
import { formatDistance , parseISO } from 'date-fns';
import { TbEdit, TbLogout } from "react-icons/tb";
import PageContainer from "../../components/shared/layout/PageContainer"
import PageHeader from "../../components/shared/layout/PageHeader"
import { getAuth } from '../../store/auth';
import LoadingData from '../../components/shared/loading';
import { Redirect } from 'react-router-dom';

function Profile() {
    const { navigate } = useApp();
    const { onSignOut } = useAuth()
    const { onOpenModal, onCloseModal, isModalOpen } = useModal();
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
        <PageContainer>
            <PageHeader>
                <header className='float_full'>
                    <h2>My Profile</h2>
                    <Button
                        label='Update Profile'
                        styles="primary"
                        icon={TbEdit}
                        action={() => navigate('/profile/update')}
                    />
                </header>
            </PageHeader>
            <Scroll>
                <div className='profile_user_info float_left'>
                    <ProfileImage
                        player={authData}
                        size={5}
                    />
                    <div>
                        <p className='md bold'>{authData?.name}</p>
                        <p className='sm'>Became a member {authData && formatDistance(parseISO(authData?.createdAt), new Date())} ago</p>
                    </div>
                </div>
                <div className='profile_caution'>
                    <Button
                        label='Sign Out'
                        styles="warning"
                        icon={TbLogout}
                        action={onOpenModal}
                    />
                </div>
            </Scroll>
            <Modal
                isModalOpen={isModalOpen}
                onCloseModal={onCloseModal}
            >
                <SignOutModal
                    signOut={onSignOut}
                    close={onCloseModal}
                />
            </Modal>
        </PageContainer>
    )
}

export default Profile
