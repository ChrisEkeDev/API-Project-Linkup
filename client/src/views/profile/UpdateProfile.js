import React from 'react'
import Form from '../../components/shared/layout/Form';
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
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';

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
    <PageContainer>
      <PageHeader>
      <header className='float_full'>
        <Back />
        <Button
            label="Update Profile"
            styles="primary"
            icon={TbEdit}
            action={onUpdateProfile}
            disabled={Object.keys(errors).length > 0}
        />
      </header>
      </PageHeader>
      <Scroll>
        <Form title='Update Profile'>
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
                  styles="warning"
                  icon={TbTrash}
                  action={onOpenModal}
              />
          </footer>
        </Form>
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
    </PageContainer>
  )
}

export default UpdateProfile
