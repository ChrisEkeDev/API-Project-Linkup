import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { list_item_animations, slide_variants, child_variants } from '../../../constants/animations';
import ProfileImage from '../../../components/shared/profileImage'
import IconButton from '../../../components/shared/button/IconButton'
import { format, parseISO } from 'date-fns';
import { PiCheckFatFill , PiArrowFatLineUpFill , PiSignOutBold, PiUserMinusBold , PiStarFill, PiStarBold } from 'react-icons/pi'
import useMemberships from '../hooks/useMemberships';

function MemberItem({membership, isMember}) {
    const { createdAt, status } = membership;
    const { name } = membership.Player
    const formatDate = format(parseISO(createdAt), 'MM/yyyy')
    const isPlayerHost = isMember.status === 'host'
    const isPlayerCoHost = isMember.status === 'co-host'
    const isMemberHost = status === 'host';
    const isMemberCoHost = status === 'co-host';
    const isMemberPending = status === 'pending';
    const isMemberMember = status === 'member';
    const showStatus = isMemberHost || isMemberCoHost;
    const { removeFromTeam, addToTeam, promoteToCoHost } = useMemberships();


    return (

    <motion.li  variants={child_variants} {...list_item_animations} className='member_item'>
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
            isPlayerHost || isPlayerCoHost ?
            <div className='member_actions'>
            <div>
                <AnimatePresence>
                    {
                        isMemberPending ?
                        <IconButton
                            label='Approve Member'
                            icon={PiCheckFatFill}
                            action={() => addToTeam(membership.teamId, membership.Player.id)}
                        /> : null
                    }
                </AnimatePresence>
            </div>
            <div>
                <AnimatePresence>
                    {
                        isMemberMember ?
                        <IconButton
                            label='Promote to Co-Host'
                            icon={PiArrowFatLineUpFill}
                            action={() => promoteToCoHost(membership.teamId, membership.Player.id)}
                        /> : null
                    }
                </AnimatePresence>
            </div>
            <div>
                <AnimatePresence>
                    {
                        (!isMemberPending && !isMemberHost && isPlayerHost) ||
                        (!isMemberPending && isPlayerCoHost && !isMemberCoHost) ?
                        <IconButton
                            label='Kick off team'
                            icon={PiUserMinusBold}
                            action={() => removeFromTeam(membership.teamId, membership.Player.id)}
                        /> : null
                    }
                </AnimatePresence>
            </div>

        </div> :
        null
        }
    </motion.li>
    )
}

export default MemberItem
