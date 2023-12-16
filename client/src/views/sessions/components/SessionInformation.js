import React from 'react'
import ProfileImage from '../../../components/shared/profileImage'
import { TbBallBasketball, TbClock, TbMapPin } from 'react-icons/tb'
import { formatTime } from '../../../helpers/dateTimeFormatters'

function SessionInformation({session}) {
  return (
    <div className='session_information'>
                <div className='session_creator'>
                    <ProfileImage
                        player={session.creator}
                        size={6}
                    />
                    <div className='details'>
                        <small>Created By</small>
                        <p>{session.creator?.name}</p>
                    </div>
                </div>
                <div className='sessions_info'>
                    <div className='grid'>
                        <div className='details'>
                            {/* <small>What</small> */}
                            <p className='grey med'>{session.name}</p>
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='details'>
                            {/* <small>When</small> */}
                            <p className='gold med'>{formatTime(session.startDate)}</p>
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='details'>
                            {/* <small>Where</small> */}
                            <p className='med'>{session.Court?.address}</p>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default SessionInformation
