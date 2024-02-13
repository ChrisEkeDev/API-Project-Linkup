import React from 'react'
import Button from '../../../components/shared/button'
import { PiXBold, PiTrashBold} from 'react-icons/pi';

function SignOutModal({signOut, close}) {
  return (
    <div className='modal_container'>
            <header className='modal_header'>
                <h2 className='md modal_title'>Sign Out?</h2>
                <p className="sm modal_sub-title">You are about to sign out of your account.</p>
            </header>
            <footer className='modal_actions'>
                <Button
                    label="Stay signed in"
                    styles="tertiary"
                    icon={PiXBold}
                    action={close}
                />
                <Button
                    label="Sign out"
                    styles="warning"
                    icon={PiTrashBold}
                    action={signOut}
                />
            </footer>
        </div>
  )
}

export default SignOutModal
