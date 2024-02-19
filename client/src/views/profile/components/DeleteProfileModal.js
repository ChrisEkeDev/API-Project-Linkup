import React from 'react'
import Button from '../../../components/shared/button'
import { TbTrash, TbX } from 'react-icons/tb';
import ProfileImage from '../../../components/shared/profileImage'
import { useApp } from '../../../context/AppContext';

function DeleteProfileModal({deleteProfile, close}) {
  const { auth } = useApp()
  return (
    <div className='modal_container'>
            <header className='modal_header'>
                <h2 className='md modal_title'>
                    Are you sure you want to delete this profile?
                </h2>
                <p className="sm modal_sub-title">
                    This cant be undone..
                </p>
            </header>
            <section className='modal_content'>
              <ProfileImage
                player={auth}
                size={5}
              />
            </section>
            <footer className='modal_actions'>
                <Button
                    label="Keep Message"
                    styles="tertiary"
                    icon={TbX}
                    action={close}
                />
                <Button
                    label="Delete Message"
                    styles="warning"
                    icon={TbTrash}
                    action={deleteProfile}
                />
            </footer>
        </div>
  )
}

export default DeleteProfileModal
