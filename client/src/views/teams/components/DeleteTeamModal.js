import React from 'react'
import { TbX, TbTrash } from 'react-icons/tb';
import Button from '../../../components/shared/button'


function DeleteTeamModal({close, deleteTeam}) {
    return (
        <div className='modal_container'>
            <h2 className='md modal_title'>
                Are you sure you want to delete this team?
            </h2>
            <p className='sm modal_body'>
                This cannot be undone. All messages and data shared in the team will
                be deleted. Forever. Do you still want to do it?
            </p>
            <div className='modal_actions'>
                <Button
                    label="Keep Team"
                    styles="tertiary"
                    icon={TbX}
                    action={close}
                />
                <Button
                    label="Delete Team"
                    styles="warning"
                    icon={TbTrash}
                    action={deleteTeam}
                />
            </div>
        </div>
    )
}

export default DeleteTeamModal
