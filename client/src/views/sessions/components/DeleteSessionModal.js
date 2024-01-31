import React from 'react'
import { PiXBold, PiTrashBold} from 'react-icons/pi';
import useDeleteSession from '../hooks/useDeleteSession'
import Button from '../../../components/shared/button'

function DeleteSessionModal({close}) {
    const { onDeleteSession } = useDeleteSession();

    return (
        <div className='modal_container'>
            <h2 className='md modal_title'>
                Are you sure you want to delete this session?
            </h2>
            <p className="sm modal_body">
                This cannot be undone. All messages and data shared in the
                session will be deleted. Forever. Do you still want to delete it?
            </p>
            <div className='modal_actions'>
                <Button
                    label="Keep Session"
                    styles="tertiary"
                    icon={PiXBold}
                    action={close}
                />
                <Button
                    label="Delete Session"
                    styles="warning"
                    icon={PiTrashBold}
                    action={onDeleteSession}
                />
            </div>
        </div>
    )
}

export default DeleteSessionModal
