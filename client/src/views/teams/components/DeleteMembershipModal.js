import React from 'react'
import Button from '../../../components/shared/button'
import { format, parseISO } from 'date-fns';
import ProfileImage from '../../../components/shared/profileImage'
import { TbX, TbTrash } from 'react-icons/tb'

function DeleteMembershipModal({close, member, deleteMembership}) {
    const { name } = member.Player
    const formatDate = format(parseISO(member.createdAt), 'MM/yyyy')

    return (
        <div className='modal_container'>
            <h2 className='md modal_title'>
                Are you sure you want to remove {name} from this team?
            </h2>
            <p className="sm modal_body">
                This cant be undone and {name} will have to join the team again.
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
                    label="Keep on Team"
                    styles="tertiary"
                    icon={TbX}
                    action={close}
                />
                <Button
                    label="Remove from Team"
                    styles="warning"
                    icon={TbTrash}
                    action={deleteMembership}
                />
            </div>
        </div>
    )
}

export default DeleteMembershipModal
