import React from 'react'
import { PiXBold, PiTrashBold} from 'react-icons/pi';
import useDeleteSession from '../hooks/useDeleteSession'
import Button from '../../../components/shared/button'

function DeleteSessionModal({session, close}) {

    const { deleteSession } = useDeleteSession();

    return (
        <div className='modal_container'>
            <h2 className='md modal_title'>Are you sure you want to delete this session?</h2>
            {/* PREVEIW OF TEAM */}
            <div className='modal_actions'>
                <Button
                    label="Keep Team"
                    styles="tertiary"
                    icon={PiXBold}
                    action={close}
                />
                <Button
                    label="Delete Team"
                    styles="warning"
                    icon={PiTrashBold}
                    action={deleteSession}
                />
            </div>
        </div>
    )
}

export default DeleteSessionModal
