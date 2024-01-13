import React from 'react'
import { PiXBold, PiTrashBold} from 'react-icons/pi';
import useDeleteTeam from '../hooks/useDeleteTeam'
import Button from '../../../components/shared/button'

function DeleteTeamModal({team, close}) {

    const { deleteTeam } = useDeleteTeam();

    return (
        <div className='modal_container'>
            <h2 className='md modal_title'>Are you sure you want to delete this team?</h2>
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
                    action={deleteTeam}
                />
            </div>
        </div>
    )
}

export default DeleteTeamModal
