import React from 'react';
import ProfileImage from '../../../components/shared/profileImage'
import IconButton from '../../../components/shared/button/IconButton'
import { format, parseISO } from 'date-fns';
import { PiCheckFatFill , PiArrowFatLineUpFill , PiSignOutBold, PiUserMinusBold , PiStarFill, PiStarBold } from 'react-icons/pi'
import { AnimatePresence } from 'framer-motion';
import useMemberships from '../hooks/useMemberships';

function MemberItem({membership, isAuth}) {
    const { createdAt, status } = membership;
    const { name } = membership.Player
    const formatDate = format(parseISO(createdAt), 'MM/yyyy')
    const isMemberHost = status === 'host';
    const isMemberCoHost = status === 'co-host';
    const isMemberPending = status === 'pending'
    const showStatus = isMemberHost || isMemberCoHost;
    const { removeFromTeam, addToTeam, promoteToCoHost } = useMemberships();

    return (

    <div className='member_item'>
        <div className='float_left'>
        <ProfileImage player={membership.Player}/>
        <div>
            <div className='flex'>
                <p className='bold md'>{name}</p>
                {
                    showStatus &&
                    <div className={`member_status member-${status}`}>
                    {isMemberHost ? <PiStarFill className='xs'/> : isMemberCoHost ? <PiStarBold className="xs"/> : null }
                    {showStatus ? <p className='xxs bold'>{status}</p> : null}
                    </div>
                }
            </div>
            <p className='sm'>Joined {formatDate}</p>
        </div>

        </div>
        {
            isAuth ?
            <div className='member_actions'>
            <div>
                <AnimatePresence>
                    {
                        showStatus || !isMemberPending ?
                        null :
                        <IconButton
                            icon={PiCheckFatFill}
                            action={() => addToTeam(membership.teamId, membership.Player.id)}
                        />
                    }
                </AnimatePresence>
            </div>
            <div>
                <AnimatePresence>
                    {
                        showStatus || isMemberPending ?
                        null :
                        <IconButton
                            icon={PiArrowFatLineUpFill}
                            action={() => promoteToCoHost(membership.teamId, membership.Player.id)}
                        />
                    }
                </AnimatePresence>
            </div>
            <div>
                <AnimatePresence>
                    {
                        showStatus || isMemberPending ?
                        null :
                        <IconButton
                            icon={PiUserMinusBold}
                            action={() => removeFromTeam(membership.teamId, membership.Player.id)}
                        />
                    }
                </AnimatePresence>
            </div>

        </div> :
        null
        }
    </div>
    )
}

export default MemberItem
