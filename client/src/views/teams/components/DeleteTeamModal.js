import React from 'react'
import { PiXBold, PiTrashBold} from 'react-icons/pi';
import Button from '../../../components/shared/button'
import ProfileImage from '../../../components/shared/profileImage';
import { format, parseISO } from 'date-fns';


function DeleteTeamModal({close, deleteTeam, member}) {
    const { name } = member.Player;
    const formatDate = format(parseISO(member.createdAt), 'MM/yyyy')

    return (
        <div className='modal_container'>
            <h2 className='md modal_title'>
                Are you sure you want to delete this team?
            </h2>
            <p className='sm modal_body'>
                This cannot be undone. All messages and data shared in the team will
                be deleted. Forever. Do you still want to do it?
            </p>
            <div className='float_left'>
                <ProfileImage player={member.Player}/>
                <div>
                    <div className='flex'>
                        <p className='bold md'>{name}</p>
                        {/* {
                            showStatus &&
                            <div className={`member_status member-${member.status}`}>
                            {isMemberHost ? <PiStarFill className='xs'/> : isMemberCoHost ? <PiStarBold className="xs"/> : null }
                            {showStatus ? <p className='xxs bold'>{member.status}</p> : null}
                            </div>
                        } */}
                    </div>
                    <p className='xs'>Joined {formatDate}</p>
                </div>
            </div>
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
