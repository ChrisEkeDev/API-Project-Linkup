import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { list_item_animations, slide_variants, child_variants } from '../../../constants/animations';
import ProfileImage from '../../../components/shared/profileImage'
import IconButton from '../../../components/shared/button/IconButton'
import { format, parseISO } from 'date-fns';
import { PiCheckFatFill , PiSignOutBold, PiUserMinusBold , PiStarFill, PiStarBold } from 'react-icons/pi'
import useCheckIns from '../hooks/useCheckIns';

function CheckInItem({checkIn, isCheckedIn, isCreator}) {
    console.log(checkIn, isCheckedIn, isCreator)
    const { status, player, createdAt, sessionId, playerId } = checkIn;
    const isPlayerCreator = checkIn.session.creatorId === playerId
    const formatDate = format(parseISO(createdAt), 'MM/yyyy')
    const isPlayerPending = status === 'pending';
    const isPlayerAttending = status === 'attending';
    const { addToSession, removeFromSession, } = useCheckIns()

  return (
    <motion.li  variants={child_variants} {...list_item_animations} className='member_item'>
        <div className='float_left'>
        <ProfileImage player={player}/>
        <div>
            <div className='flex'>
                <p className='bold md'>{player.name}</p>
                {/* {
                    showStatus &&
                    <div className={`member_status member-${status}`}>
                    {isMemberHost ? <PiStarFill className='xs'/> : isMemberCoHost ? <PiStarBold className="xs"/> : null }
                    {showStatus ? <p className='xxs bold'>{status}</p> : null}
                    </div>
                } */}
            </div>
            <p className='sm'>Joined {formatDate}</p>
        </div>

        </div>
        {
            isCreator ?
            <div className='attendance_actions'>
                <div>
                    <AnimatePresence>
                        {
                            isPlayerPending ?
                            <IconButton
                                label='Approve Player'
                                icon={PiCheckFatFill}
                                action={() => addToSession(sessionId, playerId)}
                            /> : null
                        }
                    </AnimatePresence>
                </div>
                <div>
                    <AnimatePresence>
                        {
                            isPlayerAttending && !isPlayerCreator ?
                            <IconButton
                                label='Remove Player'
                                icon={PiUserMinusBold}
                                action={() => removeFromSession(sessionId, playerId)}
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

export default CheckInItem
