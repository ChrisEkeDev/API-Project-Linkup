import React from 'react'
import { TbTrash, TbX } from 'react-icons/tb';
import Button from '../../../components/shared/button'

function DeleteSessionModal({close, deleteSession}) {

    const handleDelete = () => {
        deleteSession()
        close()
    }

    return (
        <div className='modal_container'>
            <header className='modal_header'>
                <h2 className='md modal_title'>
                    Are you sure you want to delete this session?
                </h2>
                <p className="sm modal_sub-title">
                    This cannot be undone. All messages and data shared in the
                    session will be deleted. Forever. Do you still want to delete it?
                </p>
            </header>
            <footer className='modal_actions'>
                <Button
                    label="Keep Session"
                    styles="tertiary"
                    icon={TbX}
                    action={close}
                />
                <Button
                    label="Delete Session"
                    styles="warning"
                    icon={TbTrash}
                    action={handleDelete}
                />
            </footer>
        </div>
    )
}

export default DeleteSessionModal
