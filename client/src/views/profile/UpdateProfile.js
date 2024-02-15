import React from 'react'
import { motion } from 'framer-motion'
import { page_transitions } from '../../constants/animations';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import Scroll from '../../components/shared/scroll';
import Modal from '../../components/shared/modal';
import useProfile from './hooks/useProfile';
import { TbEdit, TbTrash } from 'react-icons/tb';
import DeleteProfileModal from './components/DeleteProfileModal';
import LoadingData from '../../components/shared/loading';
import useModal from '../../hooks/useModal';

function UpdateProfile() {
  const { isModalOpen, onOpenModal, onCloseModal } = useModal();
  const {
    profileData,
    errors,
    handleInput,
    loading,
    onUpdateProfile,
    onDeleteProfile
  } = useProfile()

  if ( loading ) return <LoadingData />

  return (
    <motion.main {...page_transitions} className='page teams'>
      <header className='header'>
        <Back />
        <Button
            label="Update Profile"
            styles="primary"
            icon={TbEdit}
            action={onUpdateProfile}
            disabled={Object.keys(errors).length > 0}
        />
      </header>
      <Scroll>
        <form className='session_form'>
            <header className='form_header'>
                <h2>Update Profile</h2>
            </header>
            <Input
                label="Player Name"
                type='text'
                value={profileData.name}
                setValue={handleInput}
                name='name'
                error={errors?.name}
                disabled={false}
            />
            <Input
              label="Email"
              type='email'
              value={profileData.email}
              setValue={handleInput}
              name='email'
              error={errors.email}
              disabled={false}
            />
            <Input
              label="Password"
              type='password'
              value={profileData.password}
              setValue={handleInput}
              name='password'
              error={errors.password}
              disabled={false}
            />
            <Input
              label="Confirm Password"
              type='password'
              value={profileData.confirmPassword}
              setValue={handleInput}
              name='confirmPassword'
              error={errors.confirmPassword}
              disabled={false}
            />
            <footer className='form_caution'>
                <Button
                    label="Delete Profile"
                    styles="tertiary"
                    icon={TbTrash}
                    action={onOpenModal}
                />
            </footer>
        </form>
      </Scroll>
      <Modal
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
      >
        <DeleteProfileModal
          deleteProfile={onDeleteProfile}
          close={onCloseModal}
        />
      </Modal>
    </motion.main>
  )
}

export default UpdateProfile
