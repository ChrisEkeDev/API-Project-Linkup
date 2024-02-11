import React from 'react'
import Button from '../../../components/shared/button'
import { PiXBold, PiTrashBold} from 'react-icons/pi';

function SignOutModal({signOut, close}) {
  return (
    <div className='modal_container'>
            <h2 className='md modal_title'>
                Sign Out?
            </h2>
            <p className="sm modal_body">
                You are about to sign out of your account.
            </p>
            <div className='modal_actions'>
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
            </div>
        </div>
  )
}

export default SignOutModal
