import React from 'react'
import Button from '../../../components/shared/button'
import { PiTrashBold, PiXBold  } from 'react-icons/pi'
import { format, parseISO } from 'date-fns';
import ProfileImage from '../../../components/shared/profileImage'

function DeleteCheckInModal({close, checkIn, deleteCheckIn}) {
    const { status, player, createdAt, sessionId, playerId } = checkIn;
    const formatDate = format(parseISO(createdAt), 'MM/yyyy')

    return (
        <div className='modal_container'>
            <header className='modal_header'>
                <h2 className='md modal_title'>
                    Are you sure you want to remove {player.name} from this session?
                </h2>
                <p className="sm modal_sub-title">
                    This cant be undone and {player.name} will have to join the session again.
                </p>
            </header>
            <section className='float_left modal_content'>
                <ProfileImage player={player}/>
                <div>
                    <div className='flex'>
                        <p className='bold md'>{player.name}</p>
                    </div>
                    <p className='xs'>Joined {formatDate}</p>
                </div>
            </section>
            <footer className='modal_actions'>
                <Button
                    label="Keep in Session"
                    styles="tertiary"
                    icon={PiXBold}
                    action={close}
                />
                <Button
                    label="Remove from Session"
                    styles="warning"
                    icon={PiTrashBold}
                    action={deleteCheckIn}
                />
            </footer>
        </div>
    )
}

export default DeleteCheckInModal
